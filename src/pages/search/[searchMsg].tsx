import * as React from 'react';
import { Header } from "../../../components/Header/Header.js"
import {util} from "../../../services/util/util.js"
import {useRouter} from "next/router"

const Search = (props:any) => {

  const router = useRouter();

  console.log("SEARCHDATA: ", props.session)

  return (
    <>
      <Header user={props.session} />
      <p>{router.query.searchMsg}</p>
    </>
  )
}

export default Search;

export const getServerSideProps = async(ctx:any) => {

  const session = await util.sessionUserData(ctx);

  console.log("CTXSEARCHMSG: ", session);

  return {
    props: {
      session: session || {},
    }
  }

}