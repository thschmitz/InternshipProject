import React, {useState, useEffect} from "react";
import {FaEdit} from "react-icons/fa"
import {AiFillDelete} from "react-icons/ai"
import { postService } from "../../services/post/postService.js";
import { useNotification } from "use-toast-notification";
import { Toast } from "../../services/notification/toast.js";
import HeartButton from "./HeartButton"
import { util } from "services/util/util.js";
import { useRouter } from "next/router.js";

export const Post = ({post, editor, deletor, setShowFields, setData, deleted, setDeleted}) => {
  const notification = useNotification();
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const router = useRouter();

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

  useEffect(() => {
    getAddress();
  }, [])
    
  async function getAddress() {
    const response = await util.addressFromLatitudeAndLongitude(post.latitude, post.longitude);
    console.log("RESPOSTA: ", response)
    setCity(response.city)
    setState(response.state)
    setCountry(response.country)

    return response;
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

      <div className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <img fill onClick={() => router.push(`/post/${post.id}`)} alt="Imóvel" src={post.main_image} className="object-cover h-full w-full group-hover:scale-110 transition" />
            <div className="absolute top-3 right-3">
              <HeartButton postId={post.id}/>
            </div>
          </div>
          <div onClick={() => router.push(`/post/${post.id}`)}>
            <div className="font-semibold text-sm p-2">
              {country}, {state} 
            </div>
            <div className="font-light text-neutral-500 p-2">
              {post.type} em {city.length > 20? city.substring(0, 20) + "..." : city}
            </div>
            <div className="flex flex-row items-center gap-1 pl-2">
              <div className="font-semibold">
                {Intl.NumberFormat("pt-br", {style: "currency", currency: "BRL"}).format(post.price)}
              </div>
            </div>
          </div>

        </div>
      </div>

    </>
  );
};
