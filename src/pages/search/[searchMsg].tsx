import React, {useEffect} from 'react';
import { Header } from "../../../components/Header/Header.js"
import {util} from "../../../services/util/util.js"
import {useRouter} from "next/router"
import { setAuthState } from '../../store/authSlice';
import { cleanUserData, setUserData } from '../../store/userSlice';
import { useDispatch } from "react-redux";
import { postService } from "../../../services/post/postService.js"
import { Post } from "../../../components/Post/Post"

const Search = (props:any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(props?.session?.id) {
      dispatch(setUserData(props.session))
      dispatch(setAuthState(true));
    } else {
      dispatch(setAuthState(false))
      dispatch(cleanUserData());
    }
  })

  console.log(props.search)

  return (
    <>
      <Header />
      {
        props?.search?.map((post:any) => {
          <Post post={post} />
        })
      }
      <p>{router.query.searchMsg}</p>
    </>
  )
}

export default Search;

export const getServerSideProps = async(ctx:any) => {

  const session = await util.sessionUserData(ctx)

  const search = await postService.searchPostsByQuery(ctx.query.searchMsg);

  console.log("SEARCHPOSTS: ", search)

  return {
    props: {
      session: session || {},
      search: search || {}
    }
  }
}