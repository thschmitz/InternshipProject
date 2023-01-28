import { useEffect } from "react";
import nookies from "nookies";
import {authService} from "../../services/auth/authService.js"
import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useSelector } from "react-redux";
import {Header} from "../../components/Header/Header"
import { setUserData } from "../store/userSlice";
import { store } from "../store/store";
import { Feed } from "../../components/Feed/Feed"
import {postService} from "../../services/post/postService.js"

const Home: NextPage = (props:any) => {
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
      <Feed posts={props.posts}/>
    </div>  
  )
}

export const getServerSideProps = async(ctx:any) => {
  const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
  const cookies = nookies.get(ctx)[ACCESS_TOKEN_KEY];
  
  let authResponse = await authService.session(cookies)
  authResponse = authResponse?.data?.body;

  const response = await authService.userData(authResponse?.id);
  const posts = await postService.searchAllPosts();

  return {
    props: {
      user: response || "",
      posts: posts
    }
  }
}

export default Home;
