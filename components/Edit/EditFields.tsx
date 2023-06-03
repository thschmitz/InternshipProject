import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { GoogleMap, MarkerF, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import { postService } from 'services/post/postService';
import { MdKeyboardReturn } from "react-icons/md"
import { useNotification } from "use-toast-notification";
import { Toast } from "../../services/notification/toast.js";

const places = ['geometry', 'drawing', "places"];

export const EditFields = ({data, setShowFields}: any) => {
  const [ title, setTitle ] = useState<string>(data.title);
  const [ restrooms, setRestrooms ] = useState<number>(data.restrooms);
  const [ bedrooms, setBedrooms ] = useState<number>(data.bedrooms);
  const [ size, setSize ] = useState<number>(data.size);
  const [ image, setImage ] = useState<string>("");
  const [ price, setPrice ] = useState(data.price);
  const [ body, setBody ] = useState<string>(data.body);
  const [ address, setAddress ] = useState<string>("");
  const [ location, setLocation ] = useState({lat: null, lng: null})
  const [ type, setType ] = useState<string>(data.type);
  const [ searchBox, setSearchBox ] = useState<google.maps.places.SearchBox>();
  const [ map, setMap] = useState<google.maps.Map>();
  const [ markers, setMarkers ] = useState<any[]>([]);
  const notification = useNotification();


  function onHandleSubmitDone(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
    e.preventDefault();

    const latitude = location.lat;
    const longitude = location.lng;

    const main_image = image || data.main_image;

    try {
      const response = postService.updatePost(data.id, {title, restrooms, bedrooms, size, main_image, price, latitude, longitude, body, type})
      if(response?.data) {
        Toast.notifySuccess(notification, "Update Sucess!", "You have updated this post!")
      } else {
        Toast.notifyError(notification, "Update Error!", "Your session has expired!")
      }
    } catch(error) {
      console.log(error);
      Toast.notifyError(notification, "Update Error!", "Internal Error Exception!")
    }
  }
  
  const containerStyle = {
    width: '100%',
    height: '100%',
  };


  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  }

  const onMapLoad = (map:google.maps.Map) => {
    
    setMarkers([{lat: Number(data.latitude), lng: Number(data.longitude)}])

    map.setCenter({
      lat: Number(data.latitude),
      lng: Number(data.longitude)
    });

    map.setZoom(8)
    setMap(map);
  }

  const onPlacesChanged = () => {
    if(searchBox != undefined) {
      const places = searchBox!.getPlaces();
      const place = places![0];

      console.log("PLACE: ", place)

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


    setLocation({lat: location.lat, lng: location.lng})
    setMarkers([location])
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <p>
            <MdKeyboardReturn className="h-7 w-7 mb-10 cursor-pointer"  onClick={(e) => setShowFields(false)}/>
          </p>
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
                        <TextField value={title} id="outlined-basic" label={data.title} variant="outlined" onChange={(e) => e.target.value !== "-" ? e.target.value === undefined? setTitle(data.title): setTitle(e.target.value) : ""} required></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de banheiros</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={restrooms} id="outlined-basic" label={data.restrooms}variant="outlined" required type="number" onChange={(e) => e.target.value !== "-" ? e.target.value == undefined? setRestrooms(data.restrooms): setRestrooms(Number(e.target.value)) : ""}></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">N de quartos</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={bedrooms} id="outlined-basic" label={data.bedrooms} variant="outlined" type="number" required onChange={(e) => e.target.value !== "-" ? e.target.value === undefined? setBedrooms(data.bedrooms): setBedrooms(Number(e.target.value)) : ""}></TextField>
                      </Box>
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-10">
                      <p className="text-lg font-bold">
                        Tamanho do imóvel (m²)
                      </p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={size} id="outlined-basic" label={data.size} variant="outlined" type="number" required onChange={(e) => e.target.value !== "-" ? e.target.value === undefined? setSize(data.size): setSize(Number(e.target.value)) : ""}></TextField>
                      </Box>
                    </div>
                    <div className="mt-10">
                      <p className="text-lg font-bold">Imagem Principal</p>
                      <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                        <TextField value={image} id="outlined-basic" variant="outlined" type="file" required onChange={(e) => e.target.value !== "-" ? e.target.value === undefined? setImage(data.main_image): setImage(e.target.value) : ""}></TextField>
                      </Box>
                    </div>
                    {type === "Aluguel" ? (
                      <div className="mt-10">
                        <p className="text-lg font-bold">
                          Preço do aluguel do imóvel (R$)
                        </p>
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                          <TextField value={price} placeholder={data.price} id="outlined-basic" variant="outlined" type="number" required onChange={(e) => e.target.value !== "-" ? e.target.value === undefined? setPrice(data.price): setPrice(e.target.value) : ""}></TextField>
                        </Box>
                        
                      </div>
                    ) : (
                      <div className="mt-10">
                        <p className="text-lg font-bold">
                          Preço para venda do imóvel (R$)
                        </p>
                        <Box component="form" sx={{'& > :not(style)': { m: 1, width: '30ch' },}} noValidate autoComplete="off">
                          <TextField value={price} placeholder={data.price} id="outlined-basic" variant="outlined" type="number" required onChange={(e) => e.target.value !== "-" ? e.target.value === undefined? setPrice(data.price): setPrice(e.target.value) : ""}></TextField>
                        </Box>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center mt-10">
                  <p className="text-lg font-bold">
                    Imagem postada
                  </p>
                  <div className="flex justify-center">
                    <img src={image || data.main_image} className="max-w-3xl"></img>
                  </div>
                </div>
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
                        <MarkerF key={index} position={marker} />
                      ))}
                    </GoogleMap>
                  )}
                </div>
                <div className="mt-10">
                  <textarea
                    value={body}
                    onChange={(e) => e.target.value !== "-" ? e.target.value === undefined? setBody(data.body): setBody(e.target.value) : ""}
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
              className="bg-black max-w-fit text-white rounded-lg p-5 cursor-pointer mb-10"
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