import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { wrapper } from "../store/store";
import NotificationProvider, { useNotification } from 'use-toast-notification'

function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider config={{
      position: "top-left",
      isCloseable: false,
      showTitle: true,
      showIcon: true,
      duration: 5,
    }}>
      <Component {...pageProps} />
    </NotificationProvider>
  )
}

export default wrapper.withRedux(App);