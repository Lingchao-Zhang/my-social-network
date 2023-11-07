import type { Metadata } from 'next'
import './globals.css'
import { NavBar, Footer } from '@/components'

export const metadata: Metadata = {
  title: 'My mooc study mebsite',
  description: 'Showcase and discover remarkable developer projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
       <NavBar />
        <main>
          {children}
        </main>
       <Footer />
      </body>
    </html>
  )
}
