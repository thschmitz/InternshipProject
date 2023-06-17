import React, {useState, useEffect} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


interface PostImages {
  images: image[]
}

interface image {
  id: Number,
  created_at: Date,
  image_url: string,
  postId: Number
}

const PostImages = ({images}: PostImages) => {
  console.log(images)
  const renderSlides = images?.map((image: image) => (
    <div key={image.id}>
      <img src={image.image_url}/>
    </div>
  ))

  return (
    <div>
      <h2><b>Imagens</b></h2>
      <div className="mt-20 h-2/6 w-2/6 m-auto">
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} className="carousel-container object-cover">{renderSlides}</Carousel>
      </div>
    </div>
  )
}

export default PostImages;