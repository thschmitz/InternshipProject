import React, { useEffect, useState, useMemo } from 'react';
import {BsFillHouseFill} from "react-icons/bs"
import { MdApartment, MdCabin } from "react-icons/md"
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

export const Hub = () => {
  const [ step, setStep ] = useState("Hub");
  const [ type, setType ] = useState("");
  const [ searchBox, setSearchBox ] = useState<google.maps.places.SearchBox>();
  const [ map, setMap] = useState<google.maps.Map>();
  const [ markers, setMarkers ] = useState<any[]>([]);

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: -29.745,
    lng: -52.423
  };

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  }

  const onMapLoad = (map:google.maps.Map) => {
    setMap(map);
  }

  const onPlacesChanged = () => {
    const places = searchBox!.getPlaces();

    console.log("PLACES: ", places);

    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    }

    console.log(location)

    setMarkers([...markers, location])

    map?.panTo(location) // Coloca o centro na nova posicao
  }

  if(step === "Localization") {
    return(
      <div className="h-screen">
        <LoadScript googleMapsApiKey="AIzaSyCA_eQIClZMrzVH2loVNR_qn5VZ5kiMscs" libraries={['places']}>
          <GoogleMap onLoad={onMapLoad} mapContainerStyle={containerStyle} center={center} zoom={15}>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
              <input className="address" placeholder="Digite um endereco"/>
            </StandaloneSearchBox>

            {markers.map((marker, index) => (
              <Marker key={index} position={marker} />
            ))}

          </GoogleMap>
        </LoadScript>
      </div>
    )
  }


  if(step === "Type") {
    return(
      <div>
        <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
          <div className="flex-col">
            <div className="flex">
              <div className="w-full items-center justify-center text-xl">
                <p className="">Etapa 1</p>
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
              <p className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer" onClick={() => setStep("Hub")}>Voltar</p>
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Localization")}>Avancar</p>
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
              <p className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer" onClick={() => setStep("Type")}>Avancar</p>
            </div>
          </div>

        </div>

      
    </div>
    
  )
}