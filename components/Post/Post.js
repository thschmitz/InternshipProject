import React from "react";
import {FaEdit} from "react-icons/fa"
import {AiFillDelete} from "react-icons/ai"
import { postService } from "../../services/post/postService.js";
import { useNotification } from "use-toast-notification";
import { Toast } from "../../services/notification/toast.js";
import HeartButton from "./HeartButton"

export const Post = ({post, editor, deletor, setShowFields, setData, deleted, setDeleted}) => {
  const notification = useNotification();

  function editorShow(e) {
    e.preventDefault();
    setShowFields(true);
    setData(post)
  }


  async function handleDelete(e) {
    e.preventDefault();
    const response = await postService.deletePost(post.id)

    if(response === 204) {
      Toast.notifySuccess(notification, "Delete Sucess!", "You have deleted the post!")
      setDeleted(!deleted)
    } else {
      Toast.notifyError(notification, "Delete Error!", "You cannot delete this post because you don´t have permissions!")
    }
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

      {
        deletor?
          <div className="justify-center flex bg-gray-200 rounded-t-full">
            <AiFillDelete className="h-5 w-5 cursor-pointer" onClick={(e) => handleDelete(e)}/>
          </div>
        :
          ""
      }

      <div onClick={() => router.push(`/post/${post.id}`)} className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <img fill alt="Imóvel" src={post.main_image} className="object-cover h-full w-full group-hover:scale-110 transition" />
            <div className="absolute top-3 right-3">
              <HeartButton postId={post.id}/>
            </div>
          </div>
          <div className="font-semibold text-lg">
            {post.latitude}, {post.longitude}
          </div>
        </div>
      </div>

    </>
  );
};
