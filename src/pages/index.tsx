import { useEffect } from "react";
import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {Header} from "../../components/Header/Header"
import { cleanUserData, selectUserData, setUserData } from "../store/userSlice";
import {postService} from "../../services/post/postService.js"
import {util} from "../../services/util/util.js"
import {Feed} from "../../components/Feed/Feed.js"
import { store } from "../store/store"

const Home: NextPage = (props:any) => {
  const authState = useSelector(selectAuthState);
  const user = useSelector(selectUserData)
  const dispatch = useDispatch();
  console.log("Logado? ", authState)

  useEffect(() => {
    if(props?.session?.id) {
      dispatch(setUserData(props.session))
      dispatch(setAuthState(true));
    } else {
      dispatch(setAuthState(false))
      dispatch(cleanUserData());
    }
  })

  return (
    <div>    
      <Header/>
      <div className="max-w-5xl my-7 mx-auto">
        <Feed posts={props?.posts} />
      </div>
    </div>  
  )
}

export const getServerSideProps = async(ctx:any) => {

  const posts = await postService.searchAllPosts();
  const session = await util.sessionUserData(ctx)

  return {
    props: {
      session: session || {},
      posts: posts || [],
    }
  }
}

export default Home;

