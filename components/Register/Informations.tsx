import React from 'react'

export const Informations = ({setRestrooms, restrooms, setBedrooms, bedrooms, setImage, image, setPrice, price, setBody, body, setTitle, title, type, setSize, size, setStep, onHandleSubmitDone}:any) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <p className="">Etapa 5</p>
              <h1 className="font-bold text-5xl mt-5">
                Nos de mais informacoes sobre o imovel
              </h1>
              <div className="mt-10">
                <p>
                  Insira nos campos indicados informacoes sobre o seu imovel!
                  Lembre de que elas serao usadas para fins de filtragem na
                  busca do seu cliente.
                </p>
                <div className="flex justify-between">
                  <div className="">
                    <div className="mt-10">
                      <p className="text-lg font-bold">Titulo</p>
                      <input
                        className="inputInfoTitle"
                        placeholder="Exemplo: Casa no litoral com vista para a praia"
                        maxLength={40}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de banheiros</p>
                      <input
                        type="number"
                        className="inputInfo"
                        placeholder="Exemplo: 2"
                        value={restrooms}
                        onChange={(e) => setRestrooms(e.target.value)}
                      />
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de quartos</p>
                      <input
                        type="number"
                        className="inputInfo"
                        placeholder="Exemplo: 2"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-10">
                      <p className="text-lg font-bold">
                        Tamanho do imovel (m²)
                      </p>
                      <input
                        type="number"
                        className="inputInfo"
                        placeholder="Exemplo: 100"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      />
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">Imagem</p>
                      <input
                        type="file"
                        placeholder="Exemplo: 2"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                      />
                    </div>
                    {type === "Aluguel" ? (
                      <div className="mt-10">
                        <p className="text-lg font-bold">
                          Preco do aluguel do imovel (R$)
                        </p>
                        <input
                          type="number"
                          className="inputInfo"
                          placeholder="Exemplo: 2500"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="mt-10">
                        <p className="text-lg font-bold">
                          Preco para venda do imovel (R$)
                        </p>
                        <input
                          type="number"
                          className="inputInfo"
                          placeholder="Exemplo: 2500"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-10">
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Escreva aqui o resumo de sua propriedade"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 flex text-center">
            <p
              className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer"
              onClick={() => setStep("Localization")}
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