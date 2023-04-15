import React from 'react'
import {BsFillHouseFill} from "react-icons/bs"
import { MdApartment, MdCabin } from "react-icons/md"
import * as IconsTb from "react-icons/tb";
import * as IconsMd from "react-icons/md"
import * as IconsGi from "react-icons/gi"
import * as IconsIo from "react-icons/io"

interface Props {
  label: {
    id: Number,
    created_at: Date,
    label: string,
    icon: string,
    description: string,
  }
}

const Category: React.FC<Props> = ({label}) => {

  const Icon = IconsTb[label.icon] || IconsMd[label.icon] || IconsGi[label.icon] || IconsIo[label.icon];

  return(
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={30}/>
        <div className="flex flex-col">
          <div className="text-lg font-semibold">
            {label.label}
          </div>
          <div className="text-neutral-500 font-light">
            {label.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category;