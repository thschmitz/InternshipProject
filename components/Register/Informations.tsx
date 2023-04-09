import React from 'react'
import Counter from './components/Counter';
import BooleanFields from "./components/BooleanFields"
import Heading from "./components/Heading"

export const Informations = ({setRestrooms, restrooms, setBedrooms, bedrooms, setImage, image, setPrice, price, setBody, body, setTitle, title, type, setSize, size, setStep, onHandleSubmitDone}:any) => {

  return (
    <div className="-mt-16 mb-10">
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <Heading step={6} title={"Compartilhe algumas informações básica do seu imóvel"}/>

              <div className="flex flex-col gap-8 mt-10">
                <Counter title={"Número de Banheiros"} subtitle={"Quantos Banheiros"} value={restrooms} onChange={(value) => setRestrooms(value)}/>
                <hr/>
                <Counter title={"Número de Quartos"} subtitle={"Quantos Quartos"} value={bedrooms} onChange={(value) => setBedrooms(value)}/>
                <hr/>
                <BooleanFields title={type === "Aluguel"? "Preço do Aluguel" : "Preço de Compra"} subtitle={type==="Aluguel"? "Quanto será a mensalidade" : "Qual será o preço de compra"} values={price} setValues={setPrice} type="Price"/>
                <hr/>
                <BooleanFields title={"Tamanho do Imóvel"} subtitle={"Qual o tamanho do seu imóvel"} values={size} setValues={setSize} type="Size"/>
              </div>
            </div>
          </div>
          <div className="mt-20 flex text-center">
            <p
              className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer"
              onClick={() => setStep("Images")}
            >
              Voltar
            </p>
            <p
              className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer"
              onClick={(e) => onHandleSubmitDone(e)}
            >
              Finalizar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}