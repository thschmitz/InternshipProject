import React, {useEffect} from 'react';
import { Header } from "../../../components/Header/Header.js"
import { postService } from "../../../services/post/postService.js"
import { Feed } from 'components/Feed/Feed.js';
import { useLocalStorage } from "../../../services/localStorage/user.js"
import { Filters } from "../../../components/Filters/Filters.js"

const Search = (props:any) => {
  const [user] = useLocalStorage("user", {});

  useEffect(() => {
    const fetch = async () => {
      await user;
    }

    fetch();

  })

  return (
    <>
      <Header />
      <Filters />
      <Feed posts={props?.search}/>
    </>
  )
}

export default Search;

export const getServerSideProps = async(ctx:any) => {

  console.log("QUERIES: ", Object.values(ctx.query))
  const search = await postService.searchPostsByQuery(ctx.query.searchMsg);

  return {
    props: {
      search: search || {}
    }
  }
}