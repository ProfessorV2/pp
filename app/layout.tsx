import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '$ZAP',
  description: 'Zero Action Profit',
  generator: '$ZAP',
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
