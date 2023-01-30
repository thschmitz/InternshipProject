import React, {useEffect} from 'react';
import { Header } from "../../../components/Header/Header.js"
import {util} from "../../../services/util/util.js"
import {useRouter} from "next/router"
import { store } from '../../store/store';
import { setAuthState } from '../../store/authSlice';
import { cleanUserData, setUserData } from '../../store/userSlice';
import { useDispatch } from "react-redux";

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

  return (
    <>
      <Header />
      <p>{router.query.searchMsg}</p>
    </>
  )
}

export default Search;

export const getServerSideProps = async(ctx:any) => {

  const session = await util.sessionUserData(ctx)

  return {
    props: {
      session: session || {},
    }
  }
}