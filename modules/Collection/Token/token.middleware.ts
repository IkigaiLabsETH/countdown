import { ListenerEffectAPI, PayloadAction } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import { AppDispatch, RootState } from '../../../common/redux/store'
import { fetchCollectionToken } from './token.actions'
import { collectionTokenApi } from './token.api'
import { Network } from '../../../common/types'

export const middleware = {
  actionCreator: fetchCollectionToken,
  effect: (
    action: PayloadAction<{ contract: string; tokenId: string }>,
    listenerApi: ListenerEffectAPI<RootState, AppDispatch>,
  ) => {
    const params = {
      contract: pathOr('', ['payload', 'contract'])(action),
      tokenId: pathOr('', ['payload', 'tokenId'])(action),
      network: pathOr(Network.MAINNET, ['payload', 'network'])(action),
    }
    listenerApi.dispatch(collectionTokenApi.endpoints.getTokenByContractAndTokenId.initiate(params))
  },
}
