/* eslint-disable react/no-unescaped-entities */
import { Post } from "components/Post/Post"
import {useRouter} from "next/router"
import React from 'react'

export const Feed = ({posts, editor, deletor, setShowFields, setData, deleted, setDeleted}) => {
  const router = useRouter();

  return (
    <>
      {
      posts?.length > 0?
        <div className="flex p-2">
          {
            posts?.map((post, index) => (
              <div key={index} className="max-w-sm max-h-sm pr-3">
                <Post post={post[0] || post} editor={editor} deletor={deletor} setShowFields={setShowFields} setData={setData} deleted={deleted} setDeleted={setDeleted}/>
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