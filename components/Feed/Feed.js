import { selectUserData } from "@/store/userSlice"
import { Post } from "components/Post/Post"
import {useDispatch} from "react-redux"

export const Feed = (posts) => {
  const dispatch = useDispatch();
  const user = dispatch(selectUserData)
  console.log("FEEDPOSTS: ", posts)
  return (
    <>
      {
        posts?.posts?.map((post) => {
          <Post post={post} user={user} />
        })
      }
    </>
  )
}