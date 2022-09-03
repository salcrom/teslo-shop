import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import '../styles/globals.css'
import { ThemeProvider } from '@mui/material'
import { lightTheme } from 'themes'
import { UiProvider } from 'context'



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000, sirve para mantener actualizada la página
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <UiProvider>
        <ThemeProvider theme={ lightTheme }>
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  )
}

export default MyApp
