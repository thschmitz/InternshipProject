import React from 'react'
import Heading from "./components/Heading"
import PreviousNextButton from './components/PreviousNextButton';
import ImageUpload from "./components/ImageUpload";

interface Images {
  setStep: (step: Number) => void,
  setImage: (image:string) => void,
  image: string,
}

const Images: React.FC<Images> = ({setStep, setImage, image}) => {

  return (
    <div className="-mt-16 mb-10">
    <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
      <div className="flex-col">
        <div className="flex">
          <div className="w-full items-center justify-center text-xl">
            <Heading title="Adicione uma foto do seu Imóvel" step={5} />
            <div className="mt-10">
              <ImageUpload value={image} onChange={(value) => setImage(value)}/>
            </div>
          </div>
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