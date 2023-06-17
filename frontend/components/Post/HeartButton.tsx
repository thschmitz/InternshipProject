import React, {useState, useEffect} from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {feedbackService} from "../../services/feedback/feedbackService"
import { useNotification } from "use-toast-notification";
import { Toast } from "services/notification/toast.js";

interface HeartButtonProps {
  postId: Number,
  authState: Boolean,
}

const HeartButton: React.FC<HeartButtonProps> = ({postId, authState}) => {
  const [liked, setLiked] = useState(false);
  const [lengthLikes, setLengthLikes] = useState();
  const notification = useNotification();

  useEffect(() => {
    checkIfLiked();
  }, [authState])

  useEffect(() => {
    renderLikes();
  }, [liked])

  async function renderLikes() {
    const response = await feedbackService.getAllFeedbacksByPost(postId);
    setLengthLikes(response.length)
  }

  async function checkIfLiked() {
    const response = await feedbackService.checkIfLiked(postId);
    setLiked(response);

    return response;
  }

  async function toogleFavorite(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();

    const response = await feedbackService.like(postId);

    if(response.created_at != null) {
      setLiked(true);
      Toast.notifySuccess(notification, "Liked Successfully!", "You have liked successfully!")      

    } else {
      setLiked(false);
      Toast.notifySuccess(notification, "Unliked Successfully!", "You have unliked successfully!")      
    }
  }

  return (
    <div onClick={(e) => toogleFavorite(e)} className="relative hover:opacity-80 transition cursor-pointer">
      <div className="flex">
        <p className="text-white mr-2 font-bold text-lg">{lengthLikes}</p>
        {liked?
          <AiFillHeart size={28} className={liked? "fill-rose-500" : "fill-neutral-500/70"} />
          :
          <AiOutlineHeart size={28} className="fill-white"/>
        }
      </div>

    </div>
  )
}

export default HeartButton;