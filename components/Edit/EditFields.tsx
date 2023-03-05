import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GoogleMap, Marker, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

const places = ['geometry', 'drawing', "places"];

export const EditFields = ({data}: any, setShowFields: React.Dispatch<React.SetStateAction<boolean | undefined>>) => {
  const [ title, setTitle ] = useState<string>("");
  const [ restrooms, setRestrooms ] = useState<number>();
  const [ bedrooms, setBedrooms ] = useState<number>();
  const [ size, setSize ] = useState<number>();
  const [ image, setImage ] = useState<string>("");
  const [ price, setPrice ] = useState();
  const [ body, setBody ] = useState<string>("");
  const [ address, setAddress ] = useState<string>("");
  const [ location, setLocation ] = useState({lat: "", lng: ""})
  const [ type, setType ] = useState<string>("");
  const [ searchBox, setSearchBox ] = useState<google.maps.places.SearchBox>();
  const [ map, setMap] = useState<google.maps.Map>();
  const [ markers, setMarkers ] = useState<any[]>([]);

  function onHandleSubmitDone(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
    e.preventDefault();
  }
  
  
  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
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

    map?.panTo(latLng) // Coloca o centro na nova posicao
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY,
    libraries: places
  });

  const onMapClick = (e:google.maps.MapMouseEvent) => {
    console.log("clicked")
    const location = {
      lat: e?.latLng?.lat(),
      lng: e?.latLng?.lng(),
    }

    console.log(location)

    setMarkers([location])
  }

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    setAddress(data.address);


    const location = {
      lat: data.latitude,
      lng: data.longiutde
    }

    const locationNumber = {
      lat: Number(data.latitude),
      lng: Number(data.longitude)
    }

    console.log("LOCATIONNUMBER: ", locationNumber)

    setMarkers([locationNumber]);

    setLocation(location)
    var latLng = new google.maps.LatLng(location.lat, location.lng)

    map?.panTo(latLng) // Coloca o centro na nova posicao
  }, [])

  return (
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <h1 className="font-bold text-5xl mt-5">
                Edite os valores do imóvel selecionado
              </h1>
              <div className="mt-10">

                <div className="flex justify-between">
                  <div className="">
                    <div className="mt-10">
                      <p className="text-lg font-bold">Título</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={title} id="outlined-basic" label={data.title} variant="outlined" onChange={(e) => setTitle(e.target.value)} required></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de banheiros</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={restrooms} id="outlined-basic" label={data.restrooms}variant="outlined" required type="number" onChange={(e) => setRestrooms(Number(e.target.value))}></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de quartos</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={bedrooms} id="outlined-basic" label={data.bedrooms} variant="outlined" type="number" required onChange={(e) => setBedrooms(Number(e.target.value))}></TextField>
                      </Box>
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-10">
                      <p className="text-lg font-bold">
                        Tamanho do imóvel (m²)
                      </p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={size} id="outlined-basic" label={data.size} variant="outlined" type="number" required onChange={(e) => setSize(Number(e.target.value))}></TextField>
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
                          <TextField value={price} placeholder={data.price} id="outlined-basic" variant="outlined" type="number" required onChange={(e) => setPrice(e.target.value)}></TextField>
                        </Box>
                        
                      </div>
                    ) : (
                      <div className="mt-10">
                        <p className="text-lg font-bold">
                          Preço para venda do imóvel (R$)
                        </p>
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                          <TextField value={price} placeholder={data.price} id="outlined-basic" variant="outlined" type="number" required onChange={(e) => setPrice(e.target.value)}></TextField>
                        </Box>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center mt-10">
                  <p className="text-lg font-bold">
                    Imagem postada
                  </p>
                  {image !== ""?
                    <div className="flex justify-center">
                      <img src={image}></img>
                    </div>
                  :
                    <div className="flex justify-center">
                      <img src={data.main_image}></img>
                    </div>
                  }

                </div>
                <div className="h-96 w-full text-center mt-10">
                  {isLoaded && (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      onClick={(e) => onMapClick(e)}
                      onUnmount={onUnmount}
                      onLoad={map => {
                        const bounds = new window.google.maps.LatLngBounds();
                        map.fitBounds(bounds);
                        setMap(map);
                        const location = {
                          lat: data.latitude,
                          lng: data.longitude
                        }
                    
                        setMarkers([location]);
                    
                        setLocation(location)
                        var latLng = new google.maps.LatLng(location.lat, location.lng)
                    
                        map?.panTo(latLng) // Coloca o centro na nova posicao
                      }}
                    >
                      <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={onPlacesChanged}
                      >
                        <input
                          className="address"
                          placeholder={"Digite um endereco"}
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
                <div className="mt-10">
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={10}
                    className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={data.body}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 flex text-center">
            <p
              className="bg-black max-w-fit text-white rounded-lg p-5 mr-5 cursor-pointer"
              onClick={() => setShowFields(false)}
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