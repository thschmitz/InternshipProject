import React, {useEffect} from 'react';
import { Header } from "../../../components/Header/Header.js"
import {util} from "../../../services/util/util.js"
import {useRouter} from "next/router"
import { setAuthState } from '../../store/authSlice';
import { cleanUserData, setUserData } from '../../store/userSlice';
import { useDispatch, useSelector } from "react-redux";
import { postService } from "../../../services/post/postService.js"
import { Feed } from 'components/Feed/Feed.js';

const Search = (props:any) => {
  const dispatch = useDispatch();
  const router = useRouter();

  console.log("QUERIES2: ", router.query);

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
    <>
      <Header />
      <Feed posts={props?.search}/>
    </>
  )
}

export default Search;

export const getServerSideProps = async(ctx:any) => {

  const session = await util.sessionUserData(ctx)

  console.log("QUERIES: ", Object.values(ctx.query))
  const search = await postService.searchPostsByQuery(ctx.query.searchMsg);

  return {
    props: {
      session: session || {},
      search: search || {}
    }
  }
}