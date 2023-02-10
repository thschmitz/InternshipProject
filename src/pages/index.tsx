import { useEffect } from "react";
import type { NextPage } from "next";
import { Header } from "../../components/Header/Header";
import { postService } from "../../services/post/postService.js";
import { Feed } from "../../components/Feed/Feed.js";

const Home: NextPage = (props: any) => {
  return (
    <div>
      <Header />
      <div className="flex justify-center mt-10">
        <Feed posts={props?.posts} />
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const posts = await postService.searchAllPosts();


  return {
    props: {
      posts: posts || [],
    },
  };
};

export default Home;
