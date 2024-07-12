import "@/styles/globals.css";

import Navbar from '../component/navbar'
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import users from '../reducers/users'
import { useRouter } from 'next/router';

const store = configureStore({
  reducer: { users },
});

export default function App({ Component, pageProps }) {
  
  const router = useRouter();
  const isLoginPage = router.pathname === '/';

  return (
    <>
      <Provider store={store}>
        {!isLoginPage && (<Navbar />)}
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
