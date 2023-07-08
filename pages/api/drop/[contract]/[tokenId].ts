import { NextApiRequest, NextApiResponse } from 'next'
import { ChainId } from '@thirdweb-dev/sdk'
import { match } from 'ts-pattern'

import { BigNumber } from 'ethers'
import { getTWClient } from '../../../../common/web3'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const { contract, network, type, tokenId } = req.query

  if (!contract || !network || !tokenId) {
    res.status(400).json({ error: 'Bad Request' })
    return
  }

  try {
    const args: [string] = [contract as string]
    if (type) {
      args.push(type as string)
    }
    const client = getTWClient(ChainId[network as string])

    const clientContract = await client.getContract(...args)
    console.log(clientContract)
    let result = {}
    console.log(type)
    if (type === 'nft-drop') {
      const tokenPromise = clientContract.erc721.get(BigNumber.from(tokenId))
      result = await tokenPromise
    }

    if (type === 'edition-drop') {
      const tokenPromise = clientContract.erc1155.get(0)
      result = await tokenPromise
      console.log(result)
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  match(req.method)
    .with('GET', () => get(req, res))
    .otherwise(() => res.status(405).json({ error: 'Method Not Allowed' }))

export default handler
