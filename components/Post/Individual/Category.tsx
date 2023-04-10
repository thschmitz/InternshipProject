import React from 'react'
import {BsFillHouseFill} from "react-icons/bs"
import { MdApartment, MdCabin } from "react-icons/md"

interface Props {
  label: string
}

const Category: React.FC<Props> = ({label}) => {


  return(
    <div className="felx flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        {label === "Casa"?
          <BsFillHouseFill className="w-10 h-10" />
        :
        
        label === "Apartamento"?
          <MdApartment className="w-10 h-10" />
        :
          <MdCabin className="w-10 h-10" />
        
        }
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            {label}
          </div>
          <div className="text-neutral-500 font-light">
            O imóvel é uma {label}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category;