import { useEffect } from "react";
import type { NextPage } from "next";
import { setAuthState } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { Header } from "../../components/Header/Header";
import { cleanUserData, setUserData } from "../store/userSlice";
import { postService } from "../../services/post/postService.js";
import { util } from "../../services/util/util.js";
import { Feed } from "../../components/Feed/Feed.js";

const Home: NextPage = (props: any) => {
  const dispatch = useDispatch();
  console.log("POSTS: ", props.posts);

  useEffect(() => {
    if (props?.session?.id) {
      dispatch(setUserData(props.session));
      dispatch(setAuthState(true));
    } else {
      dispatch(setAuthState(false));
      dispatch(cleanUserData());
    }
  });

  return (
    <div>
      <Header />
      <div>
        <Feed posts={props?.posts} />
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: any) => {
  const posts = await postService.searchAllPosts();
  const session = await util.sessionUserData(ctx);

  return {
    props: {
      session: session || {},
      posts: posts || [],
    },
  };
};

export default Home;
