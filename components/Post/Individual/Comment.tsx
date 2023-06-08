import React from "react";
import TimeAgo from "react-timeago";
import Skeleton from '@mui/material/Skeleton';

interface comment {
  id: Number,
  created_at: Date,
  text: string,
  author: Number,
  post: Number,
  author_img: string,
  author_name: string,
}

interface user {
  id: Number,
  name: string,
  email: string,
  password: string,
  created_at: Date,
  image: string,
  admin: Boolean,
  phone: Number
}

interface Comment {
  comments: comment,
  users: user,
}

const Comment = ({comments, users}: Comment) => {
  return (
    <div>
      <div className="-mt-1 rounded-b-md border-gray-300 bg-white p-5 pl-16">
        <p className="text-sm">
          Comment as <span className="text-red-500">{}</span>
        </p>
        <form className="flex flex-col space-y-2">
          {" "}
          {/*Another way to do the same thing as the first try */}
          <textarea
            disabled={false}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              true ? "What are your thoughts" : "Please sign in to comment"
            }
          />
          <button
            disabled={false}
            type="submit"
            className="rounded-full bg-black p-3 font-semibold text-white disabled:bg-gray-200"
          >
            Comment
          </button>
        </form>
      </div>
      <div className="-my-5 rounded-b-md border-gray-300 bg-white py-5 px-10">
        <hr className="py-2" />
        {comments?.map((comment:any) => (
          <div
            className="relative flex items-center space-x-2 space-y-5"
            key={comment.id}
          >
            <div className="flex h-11 w-11 -mr-2">
              {users.image ? (
                <>
                  <img
                    className="rounded-full object-cover"
                    src={comment.author_img}
                  />
                </>
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
              )}
            </div>
            <div className="flex flex-col">
              <p className="py-2 text-xs text-gray-400">
                <span className="font-semibold text-gray-600 ml-2">
                  {comment.author_name}
                </span>{" "}
                • <TimeAgo date={comment.created_at} />
              </p>
              <p className="mt-2">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
