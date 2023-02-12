import React, { useEffect, useState } from 'react';

const Register = () => {

  const [ step, setStep ] = useState("Hub");
  
  if(step === "Tipo") {
    return(
      <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center h-screen">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 1</p>
                <h1 className="font-bold text-5xl mt-5">Descreva sua acomodação</h1>
                <div className="mt-10">
                  <p>Nessa etapa, perguntaremos que tipo de propriedade você deseja anunciar e se os hóspedes poderão reservar o espaço inteiro ou apenas um quarto. Em seguida, informe a localização e quantas pessoas podem se hospedar.</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center text-xl">
                <img src="https://w7.pngwing.com/pngs/981/116/png-transparent-brown-size-chart-perspective-perspective-isometric-view-3d-size-chart-stereo-kitchen.png" />
              </div>
            </div>
            <div className="mt-20 flex flex-col text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5" onClick={() => setStep("Tipo")}>Avancar</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  console.log(step)

  return(
    <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center h-screen">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 1</p>
                <h1 className="font-bold text-5xl mt-5">Descreva sua acomodação</h1>
                <div className="mt-10">
                  <p>Nessa etapa, perguntaremos que tipo de propriedade você deseja anunciar e se os hóspedes poderão reservar o espaço inteiro ou apenas um quarto. Em seguida, informe a localização e quantas pessoas podem se hospedar.</p>
                </div>
              </div>
              <div className="flex w-full items-center justify-center text-xl">
                <img src="https://w7.pngwing.com/pngs/981/116/png-transparent-brown-size-chart-perspective-perspective-isometric-view-3d-size-chart-stereo-kitchen.png" />
              </div>
            </div>
            <div className="mt-20 flex flex-col text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5" onClick={() => setStep("Tipo")}>Avancar</p>
            </div>
          </div>

        </div>
      
    </div>
    
  )
}

export default Register;