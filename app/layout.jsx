import './globals.css'
import { Open_Sans } from 'next/font/google'
import Header from './components/Header'
import Menu from './components/Menu'
import Nav from './components/Nav'
import { ReduxProvider } from '@/lib/provider'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} bg-[#F9FAFB]`}>
        <ReduxProvider>
          <Header />
          <main className='container mx-auto py-6 px-10 flex gap-10'>
            <Menu />
            <section className='flex flex-col w-full gap-5'>
              <Nav />
              {children}
            </section>
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
