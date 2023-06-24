import { useEffect } from "react";
import type { NextPage } from "next";
import { Header } from "../../components/Header/Header";
import { postService } from "../../services/post/postService.js";
import { Feed } from "../../components/Feed/Feed.js";

const Home: NextPage = (props: any) => {

  console.log(props.posts)

  return (
    <div>
      <Header />
      <div className="flex justify-center mt-10">
        <Feed posts={props?.posts} images={props.images} />
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const posts = await postService.searchAllPosts();
  const images = await postService.getAllImages();

  return {
    props: {
      posts: posts || [],
      images: images || []
    },
  };
};

export default Home;
