import React, {useEffect} from 'react';
import { postService } from '../../services/post/postService.js';
import { Feed } from "../../components/Feed/Feed.js"
import type { NextPage } from "next";

const EditHub: NextPage = ({posts}:any) => {

  useEffect(() => {
    console.log(posts)
  }, [])

  return(
    <div>
    <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
      <div className="flex-col">
        <div className="flex">
          <div className="w-full items-center justify-center text-xl">
            <h1 className="font-bold text-5xl mt-5">Qual imóvel você deseja editar?</h1>

          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Feed posts={posts} editor={true}/>
        </div>
      </div>

    </div>

  
</div>
  )
}

export const getServerSideProps = async (ctx: any) => {
  const posts = await postService.searchAllPosts();


  return {
    props: {
      posts: posts || [],
    },
  };
};


export default EditHub;