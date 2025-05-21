import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'INSYTE Solutions',
  description: 'See the patterns',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      }
    ]
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
