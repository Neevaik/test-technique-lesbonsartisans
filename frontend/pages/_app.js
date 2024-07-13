import "@/styles/globals.css";
import Navbar from '../component/navbar'
import { Provider } from "react-redux";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import users from '../reducers/users'
import { useRouter } from 'next/router';


import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

const reducers = combineReducers({ users });

const persistConfig = { key: 'testLBA', storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const isLoginPage = router.pathname === '/';

  return (

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {!isLoginPage && (<Navbar />)}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>

  )
}
