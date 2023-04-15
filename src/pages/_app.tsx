import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store, persistor } from "../store/store";
import NotificationProvider from 'use-toast-notification'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import React from "react";
import { Header } from 'components/Header/Header';

function App({ Component, pageProps }: AppProps){

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NotificationProvider config={{
            position: "top-right",
            isCloseable: false,
            showTitle: true,
            showIcon: true,
            duration: 5,
          }}>
          <Component {...pageProps} />
        </NotificationProvider>
      </PersistGate>
    </Provider>
  )
}

export default App;