import { useAddress } from '@thirdweb-dev/react'
import { split } from 'ramda'
import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../common/redux/store'
import { Button } from '../Button'
import { claim, selectToken } from '../MintPasses/mintPasses.slice'

interface MintPassProps {
  pass: string
}

export const MintPass: FC<MintPassProps> = ({ pass }) => {
  const { name, image, description, contract, tokenId } = useAppSelector(selectToken(pass))
  const dispatch = useAppDispatch()
  const address = useAddress()

  const claimPass = () => {
    dispatch(
      claim({
        contract,
        tokenId,
        address,
        amount: 1,
      }),
    )
  }

  return (
    <div className="bg-white">
      <img src={image} title={name} />
      <div className="m-8 mb-0 p-8 pb-16 bg-white">
        <div className="flex justify-between">
          <h1 className="boska">{name}</h1>
          <Button onClick={claimPass} label="Claim" />
        </div>
        <div className="pt-2">
          <p className="text-black">{description}</p>
        </div>
      </div>
    </div>
  )
}
