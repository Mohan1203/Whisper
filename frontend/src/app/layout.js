import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chit-Chat',
  description: 'Chit-chat with friends',
}

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body className="">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
