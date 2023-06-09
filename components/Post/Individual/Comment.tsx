import React, {SetStateAction, useEffect, useState} from "react";
import TimeAgo from "react-timeago";
import Skeleton from '@mui/material/Skeleton';
import { selectAuthState } from "../../../src/store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectUserData } from '../../../src/store/userSlice';
import { commentService } from "../../../services/comment/commentService"

interface comment {
  map(arg0: (comment: any) => JSX.Element): React.ReactNode;
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
  postId: Number,
  setRefreshCommentsBoolean: any,
  refreshCommentsBoolean: boolean,
}

const Comment = ({comments, users, postId, setRefreshCommentsBoolean, refreshCommentsBoolean}: Comment) => {
  const authState = useSelector(selectAuthState)
  const userData = useSelector(selectUserData)

  const [commentValue, setCommentValue] = useState("")

  useEffect(() => {
    console.log("comment>authstate: ", authState)
    console.log("comment>userdata: ", userData)
  }, [])

  async function submitComment(e:React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    console.log(commentValue)

    await commentService.comment(commentValue, postId);

    setRefreshCommentsBoolean(!refreshCommentsBoolean);
    setCommentValue("")
  }

  return (
    <div>
      <h2><b>Comentários</b></h2>
      <div className="-my-5 rounded-b-md border-gray-300 bg-white py-5">
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
      <div className="rounded-b-md border-gray-300 bg-white mt-10 mb-10">
        <p className="text-sm">
          Comment as <span className="text-orange-500">{userData.name}</span>
        </p>
        <form className="flex flex-col space-y-2">
          {" "}
          {/*Another way to do the same thing as the first try */}
          <textarea
            disabled={!authState}
            value={commentValue}
            className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50"
            placeholder={
              authState ? "What are your thoughts" : "Please sign in to comment"
            }
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button
            disabled={!authState}
            className="rounded-full bg-black p-3 font-semibold text-white disabled:bg-gray-200"
            onClick={(e) => submitComment(e)}
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
