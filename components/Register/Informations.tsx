import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';

export const Informations = ({setRestrooms, restrooms, setBedrooms, bedrooms, setImage, image, setPrice, price, setBody, body, setTitle, title, type, setSize, size, setStep, onHandleSubmitDone}:any) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <p className="">Etapa 5</p>
              <h1 className="font-bold text-5xl mt-5">
                Nos dê mais informações sobre o imóvel
              </h1>
              <div className="mt-10">
                <p>
                  Insira nos campos indicados informações sobre o seu imóvel!
                  Lembre de que elas serão usadas para fins de filtragem na
                  busca do seu cliente.
                </p>
                <div className="flex justify-between">
                  <div className="">
                    <div className="mt-10">
                      <p className="text-lg font-bold">Título</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={title} id="outlined-basic" label="Exemplo: Casa no litoral com vista para a praia" variant="outlined" onChange={(e) => setTitle(e.target.value)} required></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de banheiros</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={restrooms} id="outlined-basic" label="Exemplo: 2" variant="outlined" required type="number" onChange={(e) => setRestrooms(e.target.value)}></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de quartos</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={bedrooms} id="outlined-basic" label="Exemplo: 2" variant="outlined" type="number" required onChange={(e) => setBedrooms(e.target.value)}></TextField>
                      </Box>
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-10">
                      <p className="text-lg font-bold">
                        Tamanho do imóvel (m²)
                      </p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={size} id="outlined-basic" label="Exemplo: 100" variant="outlined" type="number" required onChange={(e) => setSize(e.target.value)}></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">Imagem Principal</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={image} id="outlined-basic" variant="outlined" type="file" required onChange={(e) => setImage(e.target.value)}></TextField>
                      </Box>
                    </div>
                    {type === "Aluguel" ? (
                      <div className="mt-10">
                        <p className="text-lg font-bold">
                          Preço do aluguel do imóvel (R$)
                        </p>
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                          <TextField value={price} placeholder="Exemplo: 2500" id="outlined-basic" variant="outlined" type="number" required onChange={(e) => setPrice(e.target.value)}></TextField>
                        </Box>
                        
                      </div>
                    ) : (
                      <div className="mt-10">
                        <p className="text-lg font-bold">
                          Preço para venda do imóvel (R$)
                        </p>
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                          <TextField value={price} placeholder="Exemplo: 1 000 000" id="outlined-basic" variant="outlined" type="number" required onChange={(e) => setPrice(e.target.value)}></TextField>
                        </Box>
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