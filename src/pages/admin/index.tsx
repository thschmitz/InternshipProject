import type { NextPage } from "next";
import { postService } from "../../../services/post/postService.js";
import React, {useEffect, useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/Logo.png";
import { useSelector, useDispatch } from "react-redux";
import { cleanUserData, selectUserData } from "../../store/userSlice";
import { useRouter } from "next/router";
import { setAuthState } from "../../store/authSlice";
import { tokenService } from "../../../services/auth/tokenService";
import { Toast } from "../../../services/notification/toast.js";
import { useNotification } from "use-toast-notification";
import {CreateHub} from "../../../components/Register/Hub"
import EditHub from "../../../components/Edit/Hub"

const Home: NextPage = (props) => {

  const [ actionState, setActionState ] = useState("Nothing")
  const [ posts, setPosts ] = useState();
  const router = useRouter();
  const user = useSelector(selectUserData)
  const dispatch = useDispatch();
  const notification = useNotification();
  const [showFields, setShowFields] = useState<boolean>();

  useEffect(() => {
    if(!user.id || user.admin === false) {
      router.push("/admin/login")
    }

    getPosts();
  }, [actionState])

  useEffect(() => {
    getPosts();
  }, [showFields])

  async function getPosts() {
    const posts = await postService.searchAllPosts();
    console.log(posts)
    setPosts(posts);
  }

  function signOut(e:any) {
    e.preventDefault();

    dispatch(setAuthState(false))
    dispatch(cleanUserData())
    localStorage.clear();

    router.push("/admin/login")
    tokenService.delete(null);
    Toast.notifySuccess(notification, "Logout Sucess!", "You have logged out!")
  }

  return (
    <div>
      <div className="sticky flex justify-between top-0 z-100 bg-white px-4 py-5 shadow-sm items-center ">
        <div className="relative h-13 w-13 flex-shrink-0 cursor-pointer">
          <Link href="/"><Image src={Logo} width={150} height={150} alt="RealStateLogo" /></Link>
        </div>
        <div className="flex">
          <p className="navButton" onClick={() => setActionState("Register")}>Registrar um imóvel</p>
          <p className="navButton" onClick={() => setActionState("Edit")}>Editar um imóvel</p>
          <p className="navButton" onClick={() => setActionState("Remove")}>Remover um imóvel</p>
        </div>
        <div className="flex h-11 w-11 ml-6 cursor-pointer">
          <img className="rounded-full object-cover" onClick={(e) => signOut(e)} src={user.image}/>
        </div>
      </div>
      {
        actionState === "Register" &&
        <CreateHub />
      }
      {
        actionState === "Edit" && 
        <EditHub posts={posts} showFields={showFields} setShowFields={setShowFields}/>
      }
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
