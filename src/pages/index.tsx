import { useEffect } from "react";
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"
import type { NextPage } from "next";
import { setAuthState } from "../store/authSlice";
import { setLoading, selectLoading } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import {Header} from "../../components/Header/Header"
import { setUserData, selectUserData } from "../store/userSlice";

const Home: NextPage = (props:any) => {
  const loadingState = useSelector(selectLoading);
  const dispatch = useDispatch();

  async function userDataFetcher(resp:any) {
    const response = await authService.userData(resp.data.body.id)
    dispatch(setUserData(response));
  }

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      if(props.cookies != "") {
        authService.session(props.cookies).then((resp:any) => {
          console.log("Session: ", resp);
          if(resp?.response?.status == 401 || resp?.status != 200) {
            dispatch(setAuthState(false))
          } else {
            dispatch(setAuthState(true))
            userDataFetcher(resp);
          }
        })
      } else {
        dispatch(setAuthState(false))
      }
    } catch(error) {
      dispatch(setAuthState(false));
    }
    dispatch(setLoading(false));
  }, [props.cookies])

  return (
    <div>    
      <Header loadingState={loadingState}/>
    </div>  
  )
}

export const getServerSideProps = (ctx:any) => {
  const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
  const cookies = nookies.get(ctx);

  return {
    props: {
      cookies: cookies[ACCESS_TOKEN_KEY] || ''
    }
  }
}

export default Home;
