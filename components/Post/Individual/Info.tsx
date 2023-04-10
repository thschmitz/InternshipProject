import React, {useState} from 'react'
import Category from "./Category"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

interface Info {
  category: string,
  description: string,
  bedrooms: Number,
  restrooms: Number,
  locationValue: {
    lat: Number,
    lng: Number
  },
  user: {
    id: Number,
    name: string,
    email: string,
    password: string,
    created_at: Date,
    image: string,
    admin: Boolean
  },
  label: string
}


const containerStyle = {
  width: '400px',
  height: '400px'
};

const places = ['geometry', 'drawing', "places"]

const Info: React.FC<Info> = ({user, category, description, bedrooms, restrooms, locationValue, label}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
    libraries: places || []
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({lat: Number(locationValue.lat), lng: Number(locationValue.lng)});
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-md font-semibold flex flex-row items-center gap-2">
          <div>Divulgado por {user.name}</div>
          <img className="rounded-full object-cover h-11 w-11" src={user.image}/>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-sm text-neutral-500">
          <div>14 Pessoas</div>
          <div>{bedrooms} quartos</div>
          <div>{restrooms} banheiros</div>
        </div>
      </div>
      <hr/>

      {category && (
        <Category label={label}/>
      )}
      <hr/>
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr/>
      {isLoaded && 
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: Number(locationValue.lat), lng: Number(locationValue.lng)}}
        zoom={12}
        onLoad={map => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
        }}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      }
      
    </div>
  )
}

export default Info;