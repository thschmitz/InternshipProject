import React, {useEffect, useState} from 'react';
import { Header } from "../../../components/Header/Header.js"
import { Feed } from 'components/Feed/Feed.js';
import { useLocalStorage } from "../../../services/localStorage/user.js"
import { Filters } from "../../../components/Filters/Filters.js"
import { useRouter } from 'next/router.js';
import { postService } from 'services/post/postService.js';

const Search = (props:any) => {
  const router = useRouter();
  const [postData, setPostData] = useState();

  return (
    <>
      <Header searchText={router.query.searchMsg}/>
      <Filters setPostsData={setPostData} postData={postData} searchText={router.query.searchMsg}/>
      <Feed posts={postData || props?.search}/>
    </>
  )
}
export const getServerSideProps = async(ctx:any) => {

  console.log("QUERIES: ", Object.values(ctx.query))
  const search = await postService.searchPostsByQuery(ctx.query.searchMsg);

  return {
    props: {
      search: search || {}
    }
  }
}

export default Search;