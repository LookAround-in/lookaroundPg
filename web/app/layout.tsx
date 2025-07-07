import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'LookaroundPG - Find Your Perfect PG Home',
  description: 'Discover safe, comfortable, and affordable paying guest accommodations. Find your perfect PG home with verified properties and trusted hosts.',
  authors: [{ name: 'FindMyPG' }],
  keywords: ['PG', 'paying guest', 'accommodation', 'rent', 'hostel', 'co-living', 'bangalore', 'mumbai', 'delhi'],
  openGraph: {
    type: 'website',
    title: 'LookaroundPG - Find Your Perfect PG Home',
    description: 'Discover safe, comfortable, and affordable paying guest accommodations with verified properties and trusted hosts.',
    url: 'https://findmypg.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LookaroundPG - Find Your Perfect PG Home',
    description: 'Discover safe, comfortable, and affordable paying guest accommodations with verified properties and trusted hosts.',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
} 