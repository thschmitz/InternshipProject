import React, { useState } from 'react'
import {FaRobot} from "react-icons/fa"
import { postService } from 'services/post/postService';

interface textArea {
  nearbySearch: any
}

const TextArea: React.FC<textArea>  = ({nearbySearch}) => {

  const [textValue, setTextValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  async function grammarChecker(text:string) {
    const stringForChatGPT = "Corrija o seguinte texto: " + text;

    const response = await postService.generateTextWithChatGPT(stringForChatGPT);
    setTextValue(response?.data.choices[0].text) 
    setIsDisabled(false)
  }

  async function generateTextWithChatGPT(e: any) {
    e.preventDefault();

    setIsDisabled(true)
    
    const listRestaurantsName = [];
    for(var i = 0; i < nearbySearch.length; i++){
      console.log(nearbySearch[i].name)
      listRestaurantsName.push(nearbySearch[i].name);
    }

    const stringForChatGPT = "Faça um texto de vendas de um imóvel, falando o quão bem localizado ele é, citando os restaurantes que estão perto dele a seguir: " + listRestaurantsName
    setTextValue("ChatGPT Digitando....");
    const response = await postService.generateTextWithChatGPT(stringForChatGPT);

    grammarChecker(response?.data.choices[0].text);
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
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-500 dark:border-gray-200 mt-10">
          <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-400">
              <div className="flex flex-wrap items-center divide-gray-300 sm:divide-x dark:divide-gray-600">
                  <div className="flex items-center space-x-1 sm:pr-4">
                     <button disabled={isDisabled} type="button" className="p-2 text-gray-200 rounded cursor-pointer" onClick={(e) => generateTextWithChatGPT(e)}>
                        <div className={`flex border p-1 border-gray-400 rounded-lg hover:text-gray-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 ${isDisabled? "bg-gray-600 text-white " : ""} `}>
                          <FaRobot/>
                          <p className="text-sm ml-2 mt-0.5">Gerar Texto Com ChatGPT</p>
                        </div>
                      </button>
                      <button disabled={isDisabled} type="button" className="p-2 text-gray-200 rounded cursor-pointer" onClick={(e) => checkTextWithChatGPT(e)}>
                        <div className={`flex border p-1 border-gray-400 rounded-lg hover:text-gray-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600 ${isDisabled? "bg-gray-600 text-white " : ""} `}>
                          <FaRobot/>
                          <p className="text-sm ml-2 mt-0.5">Correção Automática do Texto Com ChatGPT</p>
                        </div>
                      </button>
                      <button type="button" className="p-2 text-gray-200 rounded cursor-pointer hover:text-gray-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-600">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clip-rule="evenodd"></path></svg>
                          <span className="sr-only">Adicionar Emoji</span>
                      </button>
                  </div>
              </div>
          </div>
          <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-200">
              <textarea disabled={isDisabled} id="editor" rows={8} value={textValue} onChange={(e) => setTextValue(e.target.value)} className="outline-none block w-full px-0 text-sm text-gray-200 bg-white border-0 dark:bg-gray-200 focus:ring-0 dark:text-black dark:placeholder-gray-400" placeholder="Escreva a descrição do seu imóvel..." required></textarea>
          </div>
      </div>
    </form>
  )
}


export default TextArea;