import Heading from "../../../components/Post/Individual/Heading";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { postService } from "services/post/postService";
import { util } from "services/util/util";
import Info from "../../../components/Post/Individual/Info"
import { userService } from "services/users/userService";

interface postData {
  title: string,
  body: string,
  price: string,
  created_at: Date,
  size: number,
  restrooms: number,
  bedrooms: number,
  type: string,
  latitude: string,
  longitude: string,
  main_image: string,
  label: string,
}

interface props {
  data: postData,
  user: any
}

interface Address {
  city: string,
  state: string,
  country: string
}

const Post = (props:props) => {
  const [address, setAddress] = useState<Address>({city: "", state: "", country: ""})
  const locationLatLng = {lat: props.data.latitude, lng: props.data.longitude}

  async function getFullAddress() {
    const response = await util.addressFromLatitudeAndLongitude(locationLatLng.lat, locationLatLng.lng)

    setAddress(response)

    return response;
  }

  useEffect(() => {
    getFullAddress()
    console.log("USER: ", props.user)
  }, [])

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col gap-6">
        <Heading title={props.data.title} locationValue={address} imageSrc={props.data.main_image} id={props.data.id}/>
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <Info user={props.user} category={props.data.type} description={props.data.body} bedrooms={props.data.bedrooms} restrooms={props.data.restrooms} locationValue={locationLatLng} label={props.data.label}/>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async(ctx:any) => {
  const id = Object.values(ctx.query)[0];
  const post:any = await postService.searchPostById(id)

  const user:any = await userService.searchUserById(post.data.authorId)

  return {
    props: {
      data: post.data || {},
      user: user.data || {}
    }
  }
}


export default Post;