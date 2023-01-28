import { useEffect } from "react";
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"
import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { setLoading, selectLoading } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import {Header} from "../../components/Header/Header"
import { setUserData } from "../store/userSlice";
import { store } from "../store/store";

const Home: NextPage = (props:any) => {
  const loadingState = useSelector(selectLoading);
  const authState = useSelector(selectAuthState);
  console.log("Logado? ", authState)

  useEffect(() => {
    console.log("PROPS: ", props)
    if(props?.user?.id) {
      store.dispatch(setAuthState(true));
      store.dispatch(setUserData(props.user));
    } else {
      store.dispatch(setAuthState(false))
    }
  }, [])

  return (
    <div>    
      <Header/>
    </div>  
  )
}

export const getServerSideProps = async(ctx:any) => {
  const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
  const cookies = nookies.get(ctx)[ACCESS_TOKEN_KEY];
  
  let authResponse = await authService.session(cookies)
  authResponse = authResponse?.data?.body;

  const response = await authService.userData(authResponse?.id);
  
  console.log(response);

  return {
    props: {
      user: response || ""
    }
  }
}

export default Home;
