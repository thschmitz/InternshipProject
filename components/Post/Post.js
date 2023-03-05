import React from "react";
import TimeAgo from "react-timeago";
import Link from "next/link";
import {FaEdit} from "react-icons/fa"

export const Post = ({post, editor, setShowFields, setData}) => {
  function editorShow(e) {
    e.preventDefault();
    setShowFields(true);
    setData(post)
  }

  return (
    <>
      {editor?
        <div className="justify-center flex bg-gray-200 rounded-t-full">
          <FaEdit className="h-5 w-5 cursor-pointer" onClick={(e) => editorShow(e)}/>
        </div>
      :
        ""
      }

      <div className="flex rounded-t-3xl cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600 ">
          <Link href={`/post/${post?.id}`}>
            <div className={editor? `rounded-t-3xl` : ``}>
              <img className={`w-full ${editor? "" : "rounded-t-3xl"} max-w-3xl max-h-60`} src={post.main_image} alt="" />
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
    </>
  );
};
