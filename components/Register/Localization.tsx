import React, {useState} from 'react'
import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

const places = ['geometry', 'drawing', "places"];

export const Localization = ({setLocation, setStep, setAddress, address}:any) => {
  const [ searchBox, setSearchBox ] = useState<google.maps.places.SearchBox>();
  const [ map, setMap] = useState<google.maps.Map>();
  const [ markers, setMarkers ] = useState<any[]>([]);
  
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
    libraries: places
  });

  const onMapClick = (e:google.maps.MapMouseEvent) => {
    const location = {
      lat: e?.latLng?.lat(),
      lng: e?.latLng?.lng(),
    }

    setMarkers([location])
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <p className="">Etapa 4</p>
              <h1 className="font-bold text-5xl mt-5">
                Qual a localizacao do imovel?
              </h1>
              <div className="mt-10">
                <p>
                  Digite no campo indicado o endereço do seu imóvel e verifique
                  no mapa abaixo se esta corretamente assinalado
                </p>
                <div className="h-96 w-full text-center mt-10">
                  {isLoaded && (
                    <GoogleMap
                      onLoad={onMapLoad}
                      mapContainerStyle={containerStyle}
                      zoom={15}
                      onClick={(e) => onMapClick(e)}
                    >
                      <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={onPlacesChanged}
                      >
                        <input
                          className="address"
                          placeholder="Digite um endereco"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </StandaloneSearchBox>

                      {markers.map((marker, index) => (
                        <Marker key={index} position={marker} />
                      ))}
                    </GoogleMap>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 flex text-center">
            <p
              className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer"
              onClick={() => setStep("Type")}
            >
              Voltar
            </p>
            <p
              className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer"
              onClick={() => setStep("Informations")}
            >
              Avancar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
