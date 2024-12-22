import { Metadata } from 'next'
import { SITE_DESCRIPTION, SITE_LOGO_PATH, SITE_TITLE, SITE_URL } from '@/common/constants'

export async function generateMetadata({ params }: { params: { address: string; network: string } }): Promise<Metadata> {
  const { address, network } = params

  return {
    title: `${SITE_TITLE} | Offers received on ${network} by ${address}`,
    description: SITE_DESCRIPTION,
    openGraph: {
      title: `${SITE_TITLE} | Offers received on ${network} by ${address}`,
      description: SITE_DESCRIPTION,
      images: [{ url: SITE_LOGO_PATH }],
      type: 'website',
      url: `${SITE_URL}/profile/${address}/offers/${network}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_TITLE} | Offers received on ${network} by ${address}`,
      description: SITE_DESCRIPTION,
      images: [SITE_LOGO_PATH],
    },
  }
} 