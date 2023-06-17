import React, {useState, useEffect} from "react";
import Heading from "./components/Heading"
import PreviousNextButton from "./components/PreviousNextButton"
import { labelService } from "services/label/labelService";

type LabelPropsType = {
  setLabelId : (type: string) => void,
  setStep: (type: string) => void,
}

export const Label = ({setLabelId, setStep}:LabelPropsType) => {
  const [labels, setLabels] = useState<any>([]);
  const [ label, setLabel] = useState();

  useEffect(() => {
    getAllLabels();
  }, [])

  async function getAllLabels() {
    const response = await labelService.getAllLabels();

    setLabels(response);
  }

  function onClickSubmit(e: React.MouseEvent<HTMLDivElement, MouseEvent>, currentLabel:any) {
    e.preventDefault();

    setLabel(currentLabel.label)
    setLabelId(currentLabel.id)
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <Heading step={3} title={"Qual característica mais se enquadra em seu imóvel"} />
              <h1 className="font-bold text-5xl mt-5">
                
              </h1>
              <div className="mt-10">
                <p>
                  Escolha palavras-chave que enquadram o imóvel a ser inserido.
                  Lembre-se de que eles serão usados para que seu imóvel seja
                  encontrado pelos seus clientes!
                </p>
                <div className="flex">
                  {
                    labels?.map((currentLabel:any, index:any) => (
                      <div key={currentLabel.id} className={`typeAdminButton ${label === currentLabel.label ? "bg-gray-300" : ""}`} onClick={(e) => onClickSubmit(e, currentLabel)}>
                        <p>{currentLabel.label}</p>
                      </div>
                    )) 
                  }
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
