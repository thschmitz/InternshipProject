import Heading from "../../../components/Post/Individual/Heading";
import { useEffect, useState } from "react";
import { userService } from "services/users/userService";
import { labelService } from "services/label/labelService"
import { postService } from "services/post/postService";
import { util } from "services/util/util";
import Info1 from "../../../components/Post/Individual/Info1"
import Info2 from "../../../components/Post/Individual/Info2"
import Price from "../../../components/Post/Individual/Price"
import { Header } from "components/Header/Header";

interface postData {
  id: Number,
  title: string,
  body: string,
  price: Number,
  created_at: Date,
  size: number,
  restrooms: number,
  bedrooms: number,
  type: string,
  latitude: string,
  longitude: string,
  main_image: string,
  label_id: Number,
}

interface label {
  id: Number,
  created_at: Date,
  label: string,
  icon: string,
  description: string
}

interface props {
  post: postData,
  user: any,
  label: label,
}

interface Address {
  city: string,
  state: string,
  country: string
}

const Post = (props:props) => {
  const [address, setAddress] = useState<Address>({city: "", state: "", country: ""})
  const locationLatLng = {lat: props.post.latitude, lng: props.post.longitude}

  async function getFullAddress() {
    const response = await util.addressFromLatitudeAndLongitude(locationLatLng.lat, locationLatLng.lng)

    setAddress(response)

    return response;
  }

  useEffect(() => {
    getFullAddress()
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <Heading title={props.post.title} locationValue={address} imageSrc={props.post.main_image} id={props.post.id}/>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <Info1 user={props.user} category={props.post.type} description={props.post.body} locationValue={locationLatLng} label={props.label} created_at={props.post.created_at}/>
            <div className="order-1 mb-10 md:order-last md:col-span-3">
              <Price price={props.post.price} />
              <Info2 bedrooms={props.post.bedrooms} restrooms={props.post.restrooms} size={props.post.size}/>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export const getServerSideProps = async(ctx:any) => {
  const id = Object.values(ctx.query)[0];
  const post:any = await postService.searchPostById(id)

  const user:any = await userService.searchUserById(post?.data?.authorId)

  const label:any = await labelService.getLabelById(post?.data?.label_id)

  return {
    props: {
      post: post.data || {},
      user: user.data || {},
      label: label || {}
    }
  }
}


export default Post;