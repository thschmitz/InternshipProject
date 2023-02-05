import {useRouter} from "next/router"
import React, { useEffect } from 'react'
import {Header} from "../../../components/Header/Header.js"
import {Post} from "../../../components/Post/Post.js"
import { selectUserData } from "@/store/userSlice"
import { useSelector } from "react-redux"
import { authService } from "services/auth/authService.js"

const Profile = (props:any) => {
  const router = useRouter();
  const createdHour = `${props?.profile?.created_at?.[8]}${props?.profile?.created_at?.[9]}/${props?.profile?.created_at?.[5]}${props?.profile?.created_at?.[6]}/${props?.profile?.created_at?.[0]}${props?.profile?.created_at?.[1]}${props?.profile?.created_at?.[2]}${props?.profile?.created_at?.[3]}`
  const session = useSelector(selectUserData);

  return(
    <>
      <Header/>
      <div>
        <div>
          <div className="mt-12 bg-white text-center">
              <div className="mx-auto flex max-w-5xl items-center space-x-4 pb-3">
                  <div>
                  <div className="flex">
                    <img className="rounded-full object-cover w-40 h-40" src={props?.profile?.image} alt="imgProfile"/>
                  </div>

                  </div>
                  <div className="py-2">
                      <h1 className="text-3xl font-semibold">Welcome to {props?.profile?.name}`s Profile</h1>
                      <p><span className="dateCreated">Created At: </span>{createdHour}</p>
                  </div>
              </div>
          </div>

          {
            <div className="text-2xl text-center bg-white rounded-lg mt-10 p-4 flex-1 space-y-4 max-w-5xl my-7 mx-auto">
                {
                    session?.id === router.query.id ?
                        <h1>See <span className="text-red-400">{props?.profile?.posts?.length} announce(s)</span> that <span className="underline">you</span> have already posted</h1>
                    :
                        <h1>See <span className="text-red-400">{props?.profile?.posts?.length} announce(s)</span> that <span className="underline">{props?.profile?.name}</span> has already posted</h1>
                }
            </div>
          }
          <div className="mt-10 flex-1 space-y-4 max-w-5xl my-7 mx-auto">
              {
                props?.profile?.posts?.length > 0?
                  props?.profile?.posts?.map((post: any) => (
                    <Post key={post.id} post={post} />
                  ))
                :
                  <div className="flex w-full items-center justify-center p-20 text-xl">
                      <p>No posts found</p>
                  </div>
              }
          </div>
      </div>
    </div>

    </>
    
  )
}

export const getServerSideProps = async(ctx:any) => {

  const profile = await authService.userData(ctx.query.id)

  return {
    props: {
      profile: profile || {},
    }
  }
}

export default Profile;