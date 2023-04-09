import React from "react";
import {BsFillHouseFill} from "react-icons/bs"
import { MdApartment, MdCabin } from "react-icons/md"
import Heading from "./components/Heading"
import PreviousNextButton from "./components/PreviousNextButton"

export const Type = ({setType, type, setStep}:any) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <Heading step={3} title={"Quais características mais se enquadram em seu imóvel"} />
              <h1 className="font-bold text-5xl mt-5">
                
              </h1>
              <div className="mt-10">
                <p>
                  Escolha palavras-chave que enquadram o imóvel a ser inserido.
                  Lembre-se de que eles serão usados para que seu imóvel seja
                  encontrado pelos seus clientes!
                </p>
                <div className="flex">
                  <div
                    className={`typeAdminButton ${
                      type === "Casa" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setType("Casa")}
                  >
                    <BsFillHouseFill className="w-10 h-10" />
                    <p>Casa</p>
                  </div>
                  <div
                    className={`typeAdminButton ${
                      type === "Apartamento" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setType("Apartamento")}
                  >
                    <MdApartment className="w-10 h-10" />
                    <p>Apartamento</p>
                  </div>
                  <div
                    className={`typeAdminButton ${
                      type === "Cabana" ? "bg-gray-100" : ""
                    }`}
                    onClick={() => setType("Cabana")}
                  >
                    <MdCabin className="w-10 h-10" />
                    <p>Cabana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PreviousNextButton setStep={setStep} previous={"SellOrRent"} next={"Localization"}/>
        </div>
      </div>
    </div>
  );
};
