import React, { FC, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Profile } from '../Profile'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Network } from '../../common/types'
import { useWallet } from '../../common/useWallet'
import { Search } from '../Search'

export const Header: FC = () => {
  const [expanded, setExpanded] = useState<Boolean>(false)
  const { pathname, query } = useRouter()
  const network = query.network ? query.network : Network.MAINNET
  const { address } = useWallet()

  useEffect(() => {
    setExpanded(false)
  }, [pathname])

  return (
    <header className="fixed py-4 sm:py-6 z-20 w-full">
      <div className="px-4 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="z-20 w-10">
            <Link href="/" title="" className="flex items-center">
              <Image src="/assets/images/IKIGAI_LABS_logo.svg" alt="logo" width="32" height="32" />
            </Link>
          </div>
          <div className="w-1/2 justify-center hidden md:flex">
            <Search />
          </div>
          <div className="flex flex-row justify-end">
            <div className="flex">
              <Profile />
            </div>
            <div className="ml-2 w-12 h-12 flex items-center justify-center bg-black border border-solid border-gray-400 mt-0.5 rounded-lg">
              <button
                className="z-20 w-12 h-12 flex items-center justify-center "
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded ? 'true' : 'false'}
              >
                {!expanded && (
                  <span>
                    <svg
                      className="!w-6 !h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </span>
                )}

                {expanded && (
                  <span aria-hidden="true">
                    <svg
                      className="!w-6 !h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>

        <nav
          className={`absolute flex backdrop-blur top-0 items-center justify-end transition-all duration-300 visible delay-75 h-screen w-full ${
            expanded ? 'opacity-100 left-0' : 'opacity-0 left-full'
          }`}
        >
          <div
            className={`p-5 text-4xl md:text-6xl text-yellow font-bold transition-all ${
              expanded ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex justify-end">
              <Link href="/" className="p-4 bg-black mb-1 inline-block">
                Eliza
              </Link>
            </div>
            <div className="flex justify-end">
              <Link href={`/${network}/explore`} className="p-4 bg-black mb-1 inline-block">
                Explore
              </Link>
            </div>
            <div className="flex justify-end">
              <Link href="/icons" className="p-4 bg-black mb-1 inline-block">
                Iconic
              </Link>
            </div>
              <div className="flex justify-end">
              <Link href="/floor" className="p-4 bg-black mb-1 inline-block">
                Featured
              </Link>
            </div>
                <div className="flex justify-end">
              <Link href="/about" className="p-4 bg-black mb-1 inline-block">
                IkigaiLabs
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
