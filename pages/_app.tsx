/* eslint-disable react/jsx-props-no-spreading, react/function-component-definition */
import type { AppProps } from 'next/app'
import { FC, useEffect } from 'react'
import { Provider } from 'react-redux'
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  rainbowWallet,
  useChain,
  walletConnect,
} from '@thirdweb-dev/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/globals.css'

import { store } from '../common/redux'
import { Modal } from '../modules/Modal'
import { MODALS } from '../common/modal'
import { Confetti } from '../modules/Confetti'
import { persistor } from '../common/redux/store'
import { Network } from '../common/types'
import { changeRoute, initialPageLoad } from '../common/app'
import { URLS } from '../common/config'
import { getChainIdFromNetwork } from '../common/utils'
import { signer } from '../common/web3'
import { TW_SUPPORTED_CHAINS } from '../common/config/chains'

const LTLMarketplace: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter()
  const { query, events, route } = router
  const network = (query?.network as Network) || Network.MAINNET

  const sdkOptions = {}

  if (URLS[network]?.openzeppelin) {
    sdkOptions['gassless'] = {
      openzeppelin: {
        relayerUrl: URLS[network].openzeppelin,
      },
    }
  }

  useEffect(() => {
    events.on('routeChangeStart', (requestedRoute: string) => {
      store.dispatch(changeRoute(requestedRoute))
    })
  }, [events])

  useEffect(() => {
    query && store.dispatch(initialPageLoad(route))
  }, [query])

  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider
            activeChain={getChainIdFromNetwork(network)}
            queryClient={queryClient}
            sdkOptions={sdkOptions}
            signer={signer}
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
            supportedWallets={[rainbowWallet(), metamaskWallet(), coinbaseWallet(), walletConnect()]}
            supportedChains={TW_SUPPORTED_CHAINS}
            autoSwitch={true}
            autoConnect={true}
          >
            <Component {...pageProps} />
            <Modal modals={MODALS} />
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Confetti />
          </ThirdwebProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default LTLMarketplace
