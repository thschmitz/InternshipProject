import React, { Dispatch, SetStateAction, useEffect } from 'react'
import Heading from "./components/Heading"
import PreviousNextButton from './components/PreviousNextButton';
import ImageUpload from "./components/ImageUpload";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface Images {
  setStep: Dispatch<SetStateAction<string>>,
  setImage: Dispatch<SetStateAction<string | undefined>>,
  image: string | undefined,
  postImages: string[],
  setPostImages: Dispatch<SetStateAction<string[]>>,
}

const Images: React.FC<Images> = ({setStep, setImage, image, setPostImages, postImages}) => {
  const renderSlides = postImages.map((image) => (
    <div key={image}>
      <img src={image}/>
    </div>
  ))

  return (
    <div className="-mt-16 mb-10">
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <Heading title="Adicione uma foto principal ao seu Imóvel" step={5} />
              <div className="mt-10">
                  <ImageUpload onChange={(value) => setImage(value)}/>
              </div>
            </div>
          </div>
          <div className="mt-20 h-2/6 w-2/6 m-auto">
            <img src={image} />
          </div>
          <div className="w-full items-center justify-center text-xl mt-16">
            <Heading title="Adicione mais fotos extras ao seu Imóvel" step={0}/>
            <div className="mt-10">
              <ImageUpload onChange={(value) => setPostImages([...postImages, value])}/>
            </div>
          </div>
          <div className="mt-20 h-2/6 w-2/6 m-auto">
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} className="carousel-container object-cover">{renderSlides}</Carousel>
          </div>
          <div className="mt-20 flex text-center">
          <PreviousNextButton setStep={setStep} previous={"Localization"} next={"Informations"}/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Images;