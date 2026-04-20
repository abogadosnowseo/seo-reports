import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SEO Dashboard — Abogados NOW',
  description: 'Multi-platform SEO performance analytics for law firm clients.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-navy">{children}</body>
    </html>
  )
}
