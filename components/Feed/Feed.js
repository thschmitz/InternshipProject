/* eslint-disable react/no-unescaped-entities */
import { Post } from "components/Post/Post"
import {useRouter} from "next/router"

export const Feed = ({posts, editor, images}) => {
  const router = useRouter();

  return (
    <>
      {
      posts?.length > 0?
        <div className="flex p-2">
          {
            posts?.map((post, index) => (
              <div key={index} className="max-w-sm max-h-sm pr-3">
                <Post post={post[0] || post} editor={editor} images={images}/>
              </div>
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