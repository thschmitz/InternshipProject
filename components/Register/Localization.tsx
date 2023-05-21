import React, {useEffect, useState} from 'react'
import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import Heading from "./components/Heading"
import PreviousNextButton from './components/PreviousNextButton';

const places = ['geometry', 'drawing', "places"]

export const Localization = ({setLocation, setStep, setAddress, address, markers, setMarkers, setNearbySearch}:any) => {
  const [ searchBox, setSearchBox ] = useState<google.maps.places.SearchBox>();
  const [ map, setMap] = useState<google.maps.Map>();

  const listNearbySearch = []

  const containerStyle = {
    width: '100%',
    height: '100%',
  };


  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  }

  const onMapLoad = (map:google.maps.Map) => {
    setMap(map);

    var centerLat = -29
    var centerLng = -52

    map.setCenter({
      lat: Number(centerLat),
      lng: Number(centerLng)
    });

    map.setZoom(8)
  }

  const onPlacesChanged = () => {
    if(searchBox != undefined) {
      const places = searchBox!.getPlaces();
      const place = places![0];
      const location = {
        lat: place?.geometry?.location?.lat() || 0,
        lng: place?.geometry?.location?.lng() || 0,
      }
  
      setLocation(location)
      // Retirei um setMarkers daqui
      var latLng = new google.maps.LatLng(location.lat, location.lng)
  
      map?.panTo(latLng) // Coloca o centro na nova posicao
    }
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
    libraries: places || []
  });

  const onMapClick = (e:google.maps.MapMouseEvent) => {
    const location = {
      lat: e?.latLng?.lat(),
      lng: e?.latLng?.lng(),
    }

    console.log("clicou")

    setMarkers([location])

    let restaurantRequest = {
      location: location,
      keyword: 'restaurant',
      radius: 500,
    };

    let schoolRequest = {
      location: location,
      keyword: "school",
      radius: 2000
    }

    let hospitalRequest = {
      location: location,
      keyword: "hospital",
      radius: 500
    }

    var service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(restaurantRequest, nearbyCallback);
    service.nearbySearch(schoolRequest, nearbyCallback);
    service.nearbySearch(hospitalRequest, nearbyCallback);

    console.log("listNearbySearch: ", listNearbySearch)
  }

  function nearbyCallback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for(var i = 0; i < results.length; i++) {
        listNearbySearch.push(results[i])
      }

      setNearbySearch(listNearbySearch);
    }
  }

  return (
    <div className="-mt-10">
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <Heading step={4} title={"Qual a localizacao do imovel?"} />
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
          <PreviousNextButton setStep={setStep} previous={"Label"} next={"Images"}/>
        </div>
      </div>
    </div>
  );
};
