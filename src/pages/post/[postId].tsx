import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { postService } from "services/post/postService";

const Post = (props:any) => {

  

  return (
    <p>{props.data.title}</p>
  )
}

export const getServerSideProps = async(ctx:any) => {
  const id = Object.values(ctx.query)[0];
  const response:any = await postService.searchPostById(id)

  return {
    props: {
      data: response.data || {}
    }
  }
}


export default Post;