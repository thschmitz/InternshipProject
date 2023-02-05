import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store, persistor } from "../store/store";
import NotificationProvider from 'use-toast-notification'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { tokenService } from 'services/auth/tokenService';
import { authService } from 'services/auth/authService';

async function session(cookies:any) {
  const session = await authService.session(cookies);

  return await session;
}

function App({ Component, pageProps }: AppProps) {

  const cookies = tokenService.get(null);
  const sessionUser = session(cookies).then((resp) => {
    if(!resp?.data?.body?.id) {
      localStorage.clear();
      tokenService.delete();
    }
  });

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