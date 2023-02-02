import { Post } from "components/Post/Post"
import {useRouter} from "next/router"

export const Feed = ({posts}) => {
  const router = useRouter();

  console.log("FEEDPOSTS: ", posts)

  return (
    <div className="max-w-5xl my-7 mx-auto">
      {
        posts?.length > 0?
          posts?.map((post) => (
            <>
              <Post post={post[0] || post} />
            </>
          ))
        :
        // eslint-disable-next-line react/no-unescaped-entities
        <p className="text-center text-lg bold">There is no posts with search "{router.query.searchMsg}"</p>
      }
    </div>
  )
}