import React, {useState, useEffect} from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {feedbackService} from "../../services/feedback/feedbackService"

interface HeartButtonProps {
  postId: Number,
  authState: Boolean,
}

const HeartButton: React.FC<HeartButtonProps> = ({postId, authState}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, [authState])

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
    } else {
      setLiked(false);
    }
  }

  return (
    <div onClick={(e) => toogleFavorite(e)} className="relative hover:opacity-80 transition cursor-pointer">
      {liked?
        <AiFillHeart size={28} className={liked? "fill-rose-500" : "fill-neutral-500/70"} />
        :
        <AiOutlineHeart size={28} className="fill-white"/>
      }
    </div>
  )
}

export default HeartButton;