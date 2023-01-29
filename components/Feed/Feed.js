import { Post } from "components/Post/Post"

export const Feed = ({posts}) => {

  console.log("FEEDPOSTS: ", posts)

  posts?.map((post) => {
    console.log(post?.title)
  })
  return (
    <div>
      {
        posts?.map((post) => (
          <>
            <Post post={post} />
          </>
        ))


      }
    </div>
  )
}