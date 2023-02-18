import React from 'react'

export const SellOrRent = ({setType, type, setStep}:any) => {
  return(
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <p className="">Etapa 2</p>
              <h1 className="font-bold text-5xl mt-5">Vender ou alugar?</h1>
              <div className="mt-10">
                <p>Marque a opcao que mais se adeque as suas necessidades</p>
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
          <div className="mt-20 flex text-center">
            <p className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer" onClick={() => setStep("Hub")}>Voltar</p>
            <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Type")}>Avancar</p>
          </div>
        </div>
      </div>
    </div>
  )
}