import React from 'react'
import Heading from "./components/Heading"
import PreviousNextButton from './components/PreviousNextButton'

export const SellOrRent = ({setType, type, setStep}:any) => {
  return(
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <Heading step={2} title={"Vender ou alugar?"} />
              <div className="mt-10">
                <p>Marque a opção que mais se adeque às suas necessidades</p>
                <div className="flex">
                  <div className={`typeAdminButton ${type==="Venda"? "bg-gray-100" : ""}`} onClick={() => setType("Venda")}>
                    Venda
                  </div>
                  <div className={`typeAdminButton ${type==="Aluguel"? "bg-gray-100" : ""}`} onClick={() => setType("Aluguel")}>
                    Alugar
                  </div>
                </div>

              </div>
            </div>

          </div>
          <PreviousNextButton setStep={setStep} previous={"Hub"} next={"Label"}/>
        </div>
      </div>
    </div>
  )
}