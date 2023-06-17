import React, {useState} from 'react'
import {GrRestroom} from "react-icons/gr"
import { MdOutlineBedroomChild } from "react-icons/md"
import {RxSize} from "react-icons/rx"

interface Info {
  bedrooms: Number,
  restrooms: Number,
  size: Number
}

const Info2: React.FC<Info> = ({bedrooms, restrooms, size}) => {

  return (
    <div className="col-span-4 flex flex-col gap-8 mt-8">
      <hr/>
      <div className="flex p-3">
        <GrRestroom className="w-10 h-6"/> {restrooms} {restrooms > 1? "banheiros" : "banheiro"}
      </div>
      <hr/>
      <div className="flex p-3">
        <MdOutlineBedroomChild className="w-10 h-6"/> {bedrooms} {bedrooms > 1? "quartos" : "quarto"}
      </div>
      <hr/>
      <div className="flex p-3">
        <RxSize className="w-10 h-6"/> {size} m²
      </div>
      <hr/>
    </div>
  )
}

export default Info2;