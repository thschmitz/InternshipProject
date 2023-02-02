import React, {useEffect, useState} from 'react';
import { Header } from "../../../components/Header/Header.js"
import { Feed } from 'components/Feed/Feed.js';
import { Filters } from "../../../components/Filters/Filters.js"
import { useRouter } from 'next/router.js';
import { postService } from 'services/post/postService.js';
import { User } from "../../../components/User/User.js"

const Search = (props:any) => {
  const router = useRouter();
  const [postData, setPostData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);

  return (
    <>
      <Header searchText={router.query.searchMsg}/>
      <Filters setUserData={setUserData} setPostsData={setPostData} searchText={router.query.searchMsg}/>
      <div className="flex justify-center mt-10">
        {
          userData?.length > 0?
            postData?.length > 0?
              <div className="flex">
                <Feed posts={postData || props?.search}/>
                <User userData={userData}/>
              </div>
            :
              <User userData={userData}/>
          :
            <Feed posts={postData || props?.search}/>
        }
        
      </div>
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