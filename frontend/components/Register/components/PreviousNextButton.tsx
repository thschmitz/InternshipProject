import React from 'react'

const PreviousNextButton = ({setStep, previous, next}) => {
  return (
    <div className="mt-20 flex text-center">
      <p
        className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer"
        onClick={() => setStep(previous)}
      >
        Voltar
      </p>
      <p
        className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer"
        onClick={(e) => setStep(next)}
      >
        Avançar
      </p>
    </div>
  )
}

export default PreviousNextButton;