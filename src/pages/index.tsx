import { useEffect } from "react";
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"
import type { NextPage } from "next";
import { selectUserInfo, setAuthState, setUserInfo } from "../store/authSlice";
import { setLoading, selectLoading } from "../store/loadingSlice";
import { useDispatch, useSelector } from "react-redux";
import {Header} from "../../components/Header/Header"

const Home: NextPage = (props:any) => {
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

  return (
    <div>    
      <Header userState={userState} loadingState={loadingState}/>
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
