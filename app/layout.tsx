import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'INSYTE Solutions',
  description: 'Your Vision, Engineered.',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      }
    ]
  },
  openGraph: {
    title: 'INSYTE Solutions',
    description: 'Your Vision, Engineered.',
    url: 'https://insyte.solutions',
    siteName: 'INSYTE Solutions',
    images: [
      {
        url: 'https://insyte.solutions/assets/ograph.png',
        width: 1200,
        height: 630,
        alt: 'INSYTE Solutions logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INSYTE Solutions',
    description: 'Your Vision, Engineered.',
    images: ['https://insyte.solutions/assets/ograph.png'],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
