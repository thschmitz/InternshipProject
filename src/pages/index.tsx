import { useState, useEffect } from "react";
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"
import { useRouter } from "next/router.js";
import type { NextPage } from "next";
import { selectUserInfo, setAuthState, setUserInfo } from "../store/authSlice";
import { setLoading, selectLoading } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import {Header} from "../../components/Header/Header"
import { ThreeDots } from  'react-loader-spinner'

const Home: NextPage = (props:any) => {

  const router = useRouter();
  const userState = useSelector(selectUserInfo);
  const loadingState = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      if(props.cookies != "") {
        authService.session(props.cookies).then((resp:any) => {
          console.log("Here: ", resp);
          if(resp?.response?.status == 401 || resp?.status != 200) {
            dispatch(setAuthState(false))
          } else {
            dispatch(setAuthState(true))
            dispatch(setUserInfo(resp.data.body))
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

  function loginButton(e:any) {
    e.preventDefault();
    router.push("/login")
  }

  console.log(loadingState)
  if(loadingState) {
    return (
      <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    )
  }

  return (
    <div>    
      <Header userState={userState}/>
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
