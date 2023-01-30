import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/solid";
import React from "react";
import TimeAgo from "react-timeago";
import Link from "next/link";
import {FaHeart} from "react-icons/fa"
import { useSelector } from "react-redux"
import { selectUserData } from "@/store/userSlice";

export const Post = (post) => {

  const user = useSelector(selectUserData);
  console.log("DENTRO DO POST")
  console.log("POST: ", post)

  return (
    <div className="flex rounded-md cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
      {/*Votes*/}
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <FaHeart size={25} color="red"/>
      </div>
      <div className="flex flex-col">
        {/*Header*/}
        <div className="items-center space-x-2 flex ml-4 pt-4">
          <div className="text-xs text-gray-400">
            <span className="text-black font-bold hover:text-blue-400 hover:underline">
              {post?.status}
            </span>{" "}
            • Posted by{" "}
            <Link href={`/user/${post?.author?.id}`}>
              <span className="hover:text-blue-400 hover:underline">
                u/{post?.author?.name}
              </span>
            </Link>{" "}
            <TimeAgo date={post?.created_at} />
          </div>
        </div>
        <Link href={`/post/${post?.id}`}>
          <div className="p-3 pb-1">
            {/*Body*/}

            <div className="py-4">
              <h2 className="text-xl font-semibold">{post?.title}</h2>
              <p className="mt-2 text-sm font-light">{post?.body?.length > 100? post?.body?.slice(0, 100) + "..." : post?.body}</p>
            </div>

            {/*Image*/}

            <img className="w-full" src={post.image} alt="" />

            {/*Footer*/}

            <div className="flex space-x-4 text-gray-400">
              <div className="postButtons">
                <ChatAltIcon className="h-6 w-6"></ChatAltIcon>
                <p className="hidden sm:inline ml-3">
                  {post?.comments?.length} Comments
                </p>
                <p className="inline sm:hidden">{post?.comments?.length}</p>
              </div>
              <div onClick={(e) => markedFunction(e)} className="postButtons">
                {/*<BookmarkIcon className={`h-6 w-6 ${marked? "text-yellow-500" : ""}`}></BookmarkIcon>*/}
                <BookmarkIcon className={`h-6 w-6`} />
                {/*<p className={`${marked? "text-yellow-500" : ""}`}>{marks}</p>*/}
                {/*<p className={`hidden sm:inline ${marked ? "text-yellow-500" : ""}`}>Marks</p>*/}
                <p className={`hidden sm:inline`}>Marks</p>
              </div>
              <div className="postButtons">
                {post?.author?.id === user?.id ? (
                  <DotsHorizontalIcon className="h-6 w-6 text-gray-400"></DotsHorizontalIcon>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
