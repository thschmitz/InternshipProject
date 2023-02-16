import React, { useState } from 'react';
import {BsFillHouseFill} from "react-icons/bs"
import { MdApartment, MdCabin } from "react-icons/md"
import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import { postService } from 'services/post/postService';

const places = ['geometry', 'drawing', "places"];

export const Hub = () => {
  const [ step, setStep ] = useState("Hub");
  const [ type, setType ] = useState("");
  const [ searchBox, setSearchBox ] = useState<google.maps.places.SearchBox>();
  const [ map, setMap] = useState<google.maps.Map>();
  const [ markers, setMarkers ] = useState<any[]>([]);
  const [ location, setLocation ] = useState({lat: null, lng: null})
  const [ title, setTitle ] = useState("");
  const [ restrooms, setRestrooms ] = useState();
  const [ bedrooms, setBedrooms ] = useState();
  const [ size, setSize ] = useState();
  const [ image, setImage ] = useState();
  const [ price, setPrice ] = useState();
  const [ body, setBody ] = useState();
  const [ address, setAddress ] = useState();

  const containerStyle = {
    width: '100%',
    height: '100%',
  };


  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  }

  const onMapLoad = (map:google.maps.Map) => {
    setMap(map);
  }

  const onPlacesChanged = () => {
    const places = searchBox!.getPlaces();

    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    }

    setLocation(location)

    setMarkers([location])

    var latLng = new google.maps.LatLng(location.lat, location.lng)

    console.log("MAP: ", map)

    map?.panTo(latLng) // Coloca o centro na nova posicao
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
    libraries: places,
  });

  if(step === "Localization") {
    return(
      <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 4</p>
                <h1 className="font-bold text-5xl mt-5">Qual a localizacao do imovel?</h1>
                <div className="mt-10">
                  <p>Digite no campo indicado o endereco do seu imovel e verifique no mapa abaixo se esta corretamente assinalado</p>
                  <div className="h-96 w-full text-center mt-10">
                    {isLoaded&&
                      <GoogleMap onLoad={onMapLoad} mapContainerStyle={containerStyle} zoom={15}>
                      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                        <input className="address" placeholder="Digite um endereco" value={address} onChange={(e) => setAddress(e.target.value)}/>
                      </StandaloneSearchBox>

                      {markers.map((marker, index) => (
                        <Marker key={index} position={marker} />
                      ))}

                    </GoogleMap>
                    }
                  </div>

                </div>
              </div>
            </div>
            <div className="mt-20 flex text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer" onClick={() => setStep("Type")}>Voltar</p>
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Informations")}>Avancar</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if(step === "Informations") {
    return(
      <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 5</p>
                <h1 className="font-bold text-5xl mt-5">Nos de mais informacoes sobre o imovel</h1>
                <div className="mt-10">
                  <p>Insira nos campos indicados informacoes sobre o seu imovel! Lembre de que elas serao usadas para fins de filtragem na busca do seu cliente.</p>
                  <div className="flex justify-between">
                    <div className="">
                      <div className="mt-10">
                        <p className="text-lg font-bold">Titulo</p>
                        <input className="inputInfoTitle" placeholder="Exemplo: Casa no litoral com vista para a praia" maxLength={40} value={title} onChange={(e) => setTitle(e.target.value)}/>
                      </div>
                      <div className="mt-10">
                        <p className="text-lg font-bold">N de banheiros</p>
                        <input type="number" className="inputInfo" placeholder="Exemplo: 2" value={restrooms} onChange={(e) => setRestrooms(e.target.value)}/>
                      </div>
                      <div className="mt-10">
                        <p className="text-lg font-bold">N de quartos</p>
                        <input type="number" className="inputInfo" placeholder="Exemplo: 2" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}/>
                      </div>
                    </div>
                    <div className="">
                      <div className="mt-10">
                        <p className="text-lg font-bold">Tamanho do imovel (m²)</p>
                        <input type="number" className="inputInfo" placeholder="Exemplo: 100" value={size} onChange={(e) => setSize(e.target.value)}/>
                      </div>
                      <div className="mt-10">
                        <p className="text-lg font-bold">Imagem</p>
                        <input type="file" placeholder="Exemplo: 2" onChange={(e) => setImage(e.target.value)} value={image}/>
                      </div>
                        {type === "Aluguel"?
                          <div className="mt-10">
                            <p className="text-lg font-bold">Preco do aluguel do imovel (R$)</p>
                            <input type="number" className="inputInfo" placeholder="Exemplo: 2500" value={price} onChange={(e) => setPrice(e.target.value)}/>
                          </div>
                        :
                          <div className="mt-10">
                            <p className="text-lg font-bold">Preco para venda do imovel (R$)</p>
                            <input type="number" className="inputInfo" placeholder="Exemplo: 2500" value={price} onChange={(e) => setPrice(e.target.value)}/>
                          </div>
                        
                        }

                    </div>
                  </div>
                  <div className="mt-10">
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} rows="10" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escreva aqui o resumo de sua propriedade"/>
                  </div>

                </div>
              </div>

            </div>
            <div className="mt-20 flex text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer" onClick={() => setStep("Localization")}>Voltar</p>
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={(e) => onHandleSubmitDone(e)}>Finalizar</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function onHandleSubmitDone(e:any) {
    e.preventDefault();

    postService.createPost({location, title, restrooms, bedrooms, size, image, price, body, address});
  }


  if(step === "Type") {
    return(
      <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 3</p>
                <h1 className="font-bold text-5xl mt-5">Qual o tipo do imovel?</h1>
                <div className="mt-10">
                  <p>Escolha palavras-chave que enquadram o imovel a ser inserido. Lembre-se de que eles serao usados para que seu imovel seja encontrado pelos seus clientes!</p>
                  <div className="flex">
                    <div className={`typeAdminButton ${type==="Casa"? "bg-gray-100" : ""}`} onClick={() => setType("Casa")}>
                      <BsFillHouseFill className="w-10 h-10"/>
                      <p>Casa</p>
                  </div>
                    <div className={`typeAdminButton ${type==="Apartamento"? "bg-gray-100" : ""}`} onClick={() => setType("Apartamento")}>
                      <MdApartment className="w-10 h-10"/>
                      <p>Apartamento</p>
                    </div>
                    <div className={`typeAdminButton ${type==="Cabana"? "bg-gray-100" : ""}`} onClick={() => setType("Cabana")}>
                      <MdCabin className="w-10 h-10"/>
                      <p>Cabana</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            <div className="mt-20 flex text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer" onClick={() => setStep("SellOrRent")}>Voltar</p>
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Localization")}>Avancar</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if(step === "SellOrRent") {
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

  return(
    <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 1</p>
                <h1 className="font-bold text-5xl mt-5">Descreva sua acomodação</h1>
                <div className="mt-10">
                  <p>Nessa etapa, perguntaremos que tipo de propriedade você deseja anunciar e se os hóspedes poderão reservar o espaço inteiro ou apenas um quarto. Em seguida, informe a localização e quantas pessoas podem se hospedar.</p>

                </div>
              </div>
              <div className="flex w-full items-center justify-center text-xl">
                <img src="https://w7.pngwing.com/pngs/981/116/png-transparent-brown-size-chart-perspective-perspective-isometric-view-3d-size-chart-stereo-kitchen.png" />
              </div>
            </div>
            <div className="mt-20 flex flex-col text-center">
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("SellOrRent")}>Avancar</p>
            </div>
          </div>

        </div>

      
    </div>
    
  )
}