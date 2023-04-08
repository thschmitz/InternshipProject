import React from 'react'


interface HeadingData {
  step: Number,
  title: string,
}

const Heading: React.FC<HeadingData> = ({step, title}) => {
  return (
    <>
      <p className="bold">Etapa {step}</p>
      <h1 className="font-bold text-4xl mt-5">{title}</h1>
    </>
  )
}


export default Heading;