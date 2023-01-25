import { useState, useEffect } from "react";
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"
import { useRouter } from "next/router.js";
import type { NextPage } from "next";
import { selectAuthState, selectUserInfo, setAuthState, setUserInfo } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {Header} from "../../components/Header"

const Home: NextPage = (props:any) => {

  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const authState = useSelector(selectAuthState);
  const userState = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    try {
      if(props.cookies != "") {
        authService.session(props.cookies).then((resp:any) => {
          console.log("Here: ", resp);
          if(resp?.response?.status == 401 || resp?.status != 200) {
            dispatch(setAuthState(false))
          } else {
            setSession(resp.data.body);
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

    setLoading(false);


  }, [props.cookies])

  function loginButton(e:any) {
    e.preventDefault();
    router.push("/login")
  }

  const fakeUser = {
    name: "Thomas Schmitz",
    email: "thomas.henrique.schmitz",
    id: "63d160dee028f135d90177e9"
  }

  return (
    <div>    
      {
        authState?
          <>
            <p>{JSON.stringify(session, null, 2)}</p>
            <p>{userState.name}</p>
          </>
      
        :
          <>
            <button onClick={(e) => loginButton(e)}>Login</button>
            <Header userState={userState}/>
          </>
        
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
