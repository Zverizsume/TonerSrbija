import React from 'react'

import { CartProvider } from '../context/cart'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../components/theme'
import Router from 'next/router'
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'
import '../styles/globals.css'
import "@fontsource/raleway/400.css"
import "@fontsource/raleway/500.css"
import "@fontsource/raleway/600.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/800.css"
import "@fontsource/raleway/900.css"

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <ChakraProvider theme={theme}>
          <Component {...pageProps} />
      </ChakraProvider>
    </CartProvider>
  )
}

export default MyApp
