import React from "react";
import TimeAgo from "react-timeago";
import Link from "next/link";

export const Post = ({post}) => {

  return (
    <div className="flex rounded-t-3xl cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 ">

        <Link href={`/post/${post?.id}`}>
          <div className="rounded-t-3xl">
            <img className="w-full rounded-t-3xl max-w-3xl max-h-60" src={post.image} alt="" />
            <div className="p-2 flex">
              {post?.status === "Aluguel"?
                <p><b>R${post?.price}</b>/mes</p>
              :
                <p><b>R${post?.price}</b></p>
              }
              <TimeAgo date={post.created_at} className="pl-4"/>
            </div>
            
          </div>
        </Link>
      </div>
  );
};
