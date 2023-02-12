import React, { useEffect, useState } from 'react';
import {BsFillHouseFill} from "react-icons/bs"
import { MdApartment, MdCabin } from "react-icons/md"


const Hub = () => {
  const [ step, setStep ] = useState("Hub");
  const [ type, setType ] = useState("");
  
  if(step === "Type") {
    return(
      <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 1</p>
                <h1 className="font-bold text-5xl mt-5">Qual o tipo do imovel?</h1>
                <div className="mt-10">
                  <p>Escolha palavras-chave que enquadram o imovel a ser inserido. Lembre-se de que eles serao usados para que seu imovel seja encontrado pelos seus clientes!</p>
                  <div className="flex">
                    <div className={`typeAdminButton ${type==="Casa"? "bg-gray-100" : ""}`} onClick={() => setType("Casa")}>
                      <BsFillHouseFill className="w-10 h-10"/>
                      <p>Casa</p>
                  </div>
                    <div className={`typeAdminButton ${type==="Apartamento"? "bg-gray-100" : ""}`} onClick={() => setType("Apartamento")}>
                      <MdApartment className="w-10 h-10"/>
                      <p>Apartamento</p>
                    </div>
                    <div className={`typeAdminButton ${type==="Cabana"? "bg-gray-100" : ""}`} onClick={() => setType("Cabana")}>
                      <MdCabin className="w-10 h-10"/>
                      <p>Cabana</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            <div className="mt-20 flex text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer" onClick={() => setStep("Hub")}>Voltar</p>
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Localization")}>Avancar</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if(step === "Localization") {
    return(
      <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 1</p>
                <h1 className="font-bold text-5xl mt-5">Qual a localizacao do imovel?</h1>
                <div className="mt-10">
                  <p>Mostre no mapa onde se localiza o seu imovel, lembre-se de que seu cliente ira filtrar a sua pesquisa de acordo com a localizacao do imovel</p>
                </div>
              </div>

            </div>
            <div className="mt-20 flex text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer" onClick={() => setStep("Type")}>Voltar</p>
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Informations")}>Avancar</p>
            </div>
          </div>
        </div>
      </div>
    )

  }

  console.log(step)

  return(
    <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
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
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Type")}>Avancar</p>
            </div>
          </div>

        </div>
      
    </div>
    
  )
}

export default Hub;