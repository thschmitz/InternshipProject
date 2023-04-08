import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
  postId: Number,
}

const HeartButton: React.FC<HeartButtonProps> = ({postId}) => {
  const hasFavorited = false;
  const toogleFavorite = () => {};

  return (
    <div onClick={toogleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]"/>
      <AiOutlineHeart size={24} className={hasFavorited? "fill-rose-500" : "fill-neutral-500/70"} />
    </div>
  )
}

export default HeartButton;