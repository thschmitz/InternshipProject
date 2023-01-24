import { useState, useEffect } from "react";
import nookies from "nookies";
import axios from "axios";
import {authService} from "../../services/auth/authService.js"

function Home(props:any){

  const [session, setSession] = useState<any>();

  useEffect(() => {
    authService.session(props.cookies).then((resp:any) => {
      console.log("AQI: ", resp);
      setSession(resp.data.body);
    })

  }, [])

  return (
    <div>
      <p>{JSON.stringify(session, null, 2)}</p>
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
