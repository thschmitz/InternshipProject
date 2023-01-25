import { useState, useEffect } from "react";
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"
import { useRouter } from "next/router.js";
import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Home: NextPage = (props:any) => {

  const [session, setSession] = useState<any>();
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      if(props.cookies != "") {
        authService.session(props.cookies).then((resp:any) => {
          console.log("Here: ", resp);
          if(resp?.response?.status === 401 || resp?.status != 200) {
            dispatch(setAuthState(false))
          } else {
            setSession(resp.data.body);
            dispatch(setAuthState(true))
          }
        })
      } else {
        dispatch(setAuthState(false))
      }
    } catch(error) {
      dispatch(setAuthState(false))
    }
  }, [props.cookies])

  function loginButton(e:any) {
    e.preventDefault();
    router.push("/login")
  }

  return (
    <div>
      {
        authState?
          <p>{JSON.stringify(session, null, 2)}</p>
        :
          <button onClick={(e) => loginButton(e)}>Login</button>

      }
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
