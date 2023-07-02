import Image from 'next/image';
import React from 'react'
import HeartButton from '../HeartButton';

interface locationValueInterface {
  route: string | undefined,
  city: string | undefined,
  principalSubdivision: string | undefined,
  countryName: string | undefined
}

interface HeadProps {
  title: string,
  locationValue: locationValueInterface,
  imageSrc: string,
  id: Number
}

const Heading: React.FC<HeadProps> = ({title, locationValue, imageSrc, id}) => {

  return(
    <>
      <div className='text-start mt-10'>
        <div className="text-2xl font-bold">
          {title}
        </div>
        <div className="font-light text-neutral-500 mt-2">
          {locationValue?.principalSubdivision}, {locationValue?.city}
        </div>
      </div>
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image alt="Image" src={imageSrc} fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton postId={id} />
        </div>
      </div>
    </>
  )
}

export default Heading;