
import Nav from '@/components/Nav'
import './globals.css'
import Footer from '@/components/Footer'
import MiniCart from '@/components/MiniCart'
import { Providers } from '@/redux/provide'
import Login from '@/components/auth/ModalAuth'
import Head from 'next/head'




export const metadata = {
  title: 'Giancarlo-Commerce',
  description: 'App demo for e-commerce',
}

export default function RootLayout(data) {

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="../../public/logo.png" type="image/png" sizes="32x32"/>
      </Head>
      <body >
        <Providers>
          <Nav />
          <Login />
          <MiniCart />
          {data.children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
