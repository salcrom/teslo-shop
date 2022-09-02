import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from 'themes'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <ThemeProvider theme={ lightTheme }>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}

export default MyApp
