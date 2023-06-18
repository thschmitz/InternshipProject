import React from 'react'


interface HeadingData {
  step: Number,
  title: string,
}

const Heading: React.FC<HeadingData> = ({step, title}) => {
  return (
    <>
      {step !== 0? 
        <p className="bold">Etapa {step}</p>
      :   
        <p></p>
      }
      <h1 className="font-bold text-4xl mt-5">{title}</h1>
    </>
  )
}


export default Heading;