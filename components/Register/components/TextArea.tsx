import React, {  useState } from 'react'
import {FaRobot} from "react-icons/fa"
import { postService } from 'services/post/postService';
import TextField from '@material-ui/core/TextField';
import { Toast } from 'services/notification/toast';
import { useNotification } from 'use-toast-notification';

interface textArea {
  nearbySearch: (type: any) => void,
  setTextValue: (type: string) => void,
  textValue: string,
}

const TextArea: React.FC<textArea>  = ({nearbySearch, textValue, setTextValue}) => {
  const notification = useNotification();

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  async function grammarChecker(text:string) {
    setTextValue("ChatGPT Corrigindo....");
    const stringForChatGPT = "Corrija o seguinte texto: " + text;

    const response = await postService.generateTextWithChatGPT(stringForChatGPT);
    setTextValue(response?.data.choices[0].text) 
    setIsDisabled(false)
  }

  async function generateTextWithChatGPT(e: any) {
    e.preventDefault();

    setIsDisabled(true)
    
    const listRestaurantsName = [];
    const listRestaurantRating = [];
    const listSchoolsName = [];
    const listSchoolRating = [];
    const listHospitalsName = [];
    const listHospitalsRating = [];

    if(nearbySearch.length > 0) {
      for(var i = 0; i < nearbySearch.length; i++){
        if(nearbySearch[i].types.includes("restaurant")) {
          if(nearbySearch[i].rating > 3) {
            listRestaurantsName.push(nearbySearch[i].name);
            listRestaurantRating.push(nearbySearch[i].rating)
          }
        } else if(nearbySearch[i].types.includes("school")) {
          if(nearbySearch[i].rating > 3) {
            listSchoolsName.push(nearbySearch[i].name);
            listSchoolRating.push(nearbySearch[i].rating)
          }
        } else if(nearbySearch[i].types.includes("hospital")) {
          if(nearbySearch[i].rating > 3) {
            listHospitalsName.push(nearbySearch[i].name);
            listHospitalsRating.push(nearbySearch[i].rating)
          }
        }
      }

      const stringForChatGPT = "Faça um texto de vendas de um imóvel, falando sobre alguns dos restaurantes que estão perto dele, a um raio de 500 metros, a seguir: " + listRestaurantsName + ". Com suas respectivas notas de avaliação: " + listRestaurantRating + ". Além disso, cite algumas das escolas que estão presentes em um raio de 2000 metros do imóvel: " + listSchoolsName + ". Com suas respectivas notas de avaliação: " + listSchoolRating +". Ainda, diga fale de alguns centros de saúde qeu estão pertos do estabelecimento imobiliário, ao redor de 500 metros: " + listHospitalsName + ". Com suas respectivas notas de avaliação: " + listHospitalsRating
      setTextValue("ChatGPT Digitando....");
      const response = await postService.generateTextWithChatGPT(stringForChatGPT);
  
      grammarChecker(response?.data.choices[0].text);
    } else {
      Toast.notifyError(notification, "Error to call ChatGPT", "You have to mark any location in the map to complete this action!")
    }
  }

  async function checkTextWithChatGPT(e: any) {
    e.preventDefault();

    if(textValue != "") {
      setIsDisabled(true)
      grammarChecker(textValue)
      setTextValue("ChatGPT Corrigindo....");
    }
  }

  return(
    <form>
      <div className="w-full mb-4 mt-10">
          <div className="flex items-center justify-between px-3 py-2 border-b ">
              <div className="flex flex-wrap items-center">
                  <div className="flex items-center space-x-1 sm:pr-4">
                     <button disabled={isDisabled} type="button" className="p-2 rounded cursor-pointer" onClick={(e) => generateTextWithChatGPT(e)}>
                        <div className={`flex border p-1 hover:bg-gray-200 ${isDisabled? "text-gray-200" : ""} `}>
                          <FaRobot/>
                          <p className="text-sm ml-2 mt-0.5">Gerar Texto Com ChatGPT</p>
                        </div>
                      </button>
                      <button disabled={isDisabled} type="button" className="p-2 rounded cursor-pointer " onClick={(e) => checkTextWithChatGPT(e)}>
                        <div className={`flex border p-1 hover:bg-gray-200 ${isDisabled? "text-gray-200 " : ""} `}>
                          <FaRobot/>
                          <p className="text-sm ml-2 mt-0.5">Correção Automática do Texto Com ChatGPT</p>
                        </div>
                      </button>
                  </div>
              </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-b-lg ">
            <TextField
              id="outlined-multiline-static"
              label="Escreva a descrição de seu imóvel"
              multiline
              value={textValue}
              variant="outlined"
              onChange={(e) => setTextValue(e.target.value)}
              className="w-full"
              disabled={isDisabled}
            />
          </div>
      </div>
    </form>
  )
}


export default TextArea;