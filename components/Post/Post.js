import {
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

export const Post = ({post}) => {

  const user = useSelector(selectUserData);

  return (
    <div className="flex rounded-t-3xl cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 ">

        <Link href={`/post/${post?.id}`}>
          <div className="rounded-t-3xl">
            <img className="w-full rounded-t-3xl max-w-3xl max-h-60" src={post.image} alt="" />
            <p><b>R${post?.price}</b> noite</p>
          </div>
        </Link>
      </div>
  );
};
