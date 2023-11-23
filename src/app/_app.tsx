import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import React from 'react'
import theme from '../theme'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
    </ThemeProvider>;
}