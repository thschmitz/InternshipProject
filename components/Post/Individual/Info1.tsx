import React from 'react'
import Category from "./Category"
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import TimeAgo from "react-timeago";

interface Info {
  category: string,
  description: string,
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
    admin: Boolean,
    phone: Number
  },
  label: {
    id: Number,
    created_at: Date,
    label: string,
    icon: string,
    description: string,
  },
  created_at: string
}


const containerStyle = {
  width: '400px',
  height: '400px'
};

const places = ['geometry', 'drawing', "places"]

const Info1: React.FC<Info> = ({user, category, description, locationValue, label, created_at}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || "",
    libraries: places || []
  })

  console.log({lat: Number(locationValue.lat), lng: Number(locationValue.lng)})

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-md font-semibold flex flex-row items-center gap-2">
          <div>Divulgado por {user.name}</div>
          <img className="rounded-full object-cover h-11 w-11" src={user.image}/>
        </div>
        <div className="-mt-2 flex flex-row items-center gap-1 font-light text-sm text-neutral-500">
          Publicado há <TimeAgo date={created_at} locale="pt-BR"></TimeAgo>
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
          zoom={15}
          onLoad={map => {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
          }}
      >
          <MarkerF position={{lat: Number(locationValue.lat), lng: Number(locationValue.lng)}}/>
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      }
      
    </div>
  )
}

export default Info1;