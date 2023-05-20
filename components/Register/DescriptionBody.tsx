import React from "react";
import Heading from "./components/Heading"
import TextArea from "./components/TextArea";

export const DescriptionBody = ({ setStep, onHandleSubmitDone, nearbySearch }: any) => {

  return (
    <div className="-mt-16 mb-10">
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <Heading
                step={7}
                title={"Escreva sobre o seu imóvel, como os estabelecimentos próximos que mostrem o quão localizado é a propriedade"}
              />

              <TextArea nearbySearch={nearbySearch}/>
            </div>
          </div>
          <div className="mt-20 flex text-center">
            <p
              className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer"
              onClick={() => setStep("Informations")}
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
};
