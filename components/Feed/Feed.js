/* eslint-disable react/no-unescaped-entities */
import { Post } from "components/Post/Post"
import {useRouter} from "next/router"

export const Feed = ({posts}) => {
  const router = useRouter();

  return (
    <>
      {
      posts?.length > 0?
        <div className="">
          {
            posts?.map((post) => (
              <>
                <Post post={post[0] || post} />
              </>
            ))
          }

        </div>
      :
        <div className="flex-1 mt-10 text-center">
          <p className="text-lg bold">There is no posts with search "{router.query.searchMsg}"</p>
        </div>
      }
    </>

  )
}