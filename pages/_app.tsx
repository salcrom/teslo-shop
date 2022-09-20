import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { SWRConfig } from 'swr'
import { ThemeProvider } from '@mui/material'

import '../styles/globals.css'
import { lightTheme } from '../themes'
import { AuthProvider, CartProvider, UiProvider } from '../context'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
        <SWRConfig
          value={{
            // refreshInterval: 3000, sirve para mantener actualizada la página
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={ lightTheme }>
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
}

export default MyApp
