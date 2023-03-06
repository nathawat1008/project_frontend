import '../styles/globals.css'
import Layout from '../src/components/Layout'
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );}

export default MyApp
