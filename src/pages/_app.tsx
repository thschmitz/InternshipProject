import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from "../store/store";
import NotificationProvider from 'use-toast-notification'
import {Provider} from 'react-redux'

function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <NotificationProvider config={{
        position: "top-right",
        isCloseable: false,
        showTitle: true,
        showIcon: true,
        duration: 5,
      }}>
          <Component {...pageProps} />
      </NotificationProvider>
    </Provider>

  )
}

export default App;