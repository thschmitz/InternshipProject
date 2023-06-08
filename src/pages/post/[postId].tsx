import Heading from "../../../components/Post/Individual/Heading";
import { useEffect, useState } from "react";
import { userService } from "services/users/userService";
import { labelService } from "services/label/labelService"
import { postService } from "services/post/postService";
import { commentService } from "services/comment/commentService"
import { util } from "services/util/util";
import Info1 from "../../../components/Post/Individual/Info1"
import Info2 from "../../../components/Post/Individual/Info2"
import Price from "../../../components/Post/Individual/Price"
import { Header } from "components/Header/Header";
import TimeAgo from "react-timeago";
import Skeleton from '@mui/material/Skeleton';

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

interface comment {
  id: Number,
  created_at: Date,
  text: string,
  author: Number,
  post: Number
}

interface props {
  post: postData,
  user: any,
  label: label,
  comments: comment[]
}

interface Address {
  city: string,
  state: string,
  country: string
}

const Post = (props:props) => {
  const [address, setAddress] = useState<Address>({city: "", state: "", country: ""})
  const [ comments, setComments ] = useState<comment[]>(props.comments)
  const locationLatLng = {lat: props.post.latitude, lng: props.post.longitude}

  async function getFullAddress() {
    const response = await util.addressFromLatitudeAndLongitude(locationLatLng.lat, locationLatLng.lng)

    setAddress(response)

    return response;
  }

  useEffect(() => {
    getFullAddress()
    console.log(props.comments)
  }, [])

  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <Heading title={props.post.title} locationValue={address} imageSrc={props.post.main_image} id={props.post.id}/>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <Info1 user={props.user} category={props.post.type} locationValue={locationLatLng} label={props.label} created_at={props.post.created_at}/>
            <div className="order-1 mb-10 md:order-last md:col-span-3">
              <Price price={props.post.price} />
              <Info2 bedrooms={props.post.bedrooms} restrooms={props.post.restrooms} size={props.post.size}/>
            </div>
          </div>
          <hr/>
          <p className="text-lg font-light text-neutral-500">{props.post.body}</p>
          <div>
                <div className="-mt-1 rounded-b-md border-gray-300 bg-white p-5 pl-16">
                    <p className="text-sm">Comment as <span className="text-red-500">{}</span></p>
                    <form className="flex flex-col space-y-2"> {/*Another way to do the same thing as the first try */}
                        <textarea disabled={false} className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50" placeholder={true? "What are your thoughts" : "Please sign in to comment"}/>
                        <button disabled={false} type="submit" className="rounded-full bg-black p-3 font-semibold text-white disabled:bg-gray-200">Comment</button>
                    </form>
                </div>
                <div className="-my-5 rounded-b-md border-gray-300 bg-white py-5 px-10">
                    <hr className="py-2"/>
                    {props.comments?.map(comment => (
                        <div className="relative flex items-center space-x-2 space-y-5" key={comment.id}>
                            <div className="flex h-11 w-11 -mr-2">
                              {props.user.image?
                                <>
                                  <img className="rounded-full object-cover" src={props.user.image}/>
                                </>
                              :
                                <Skeleton variant="circular" width={40} height={40} />
                              }
                            </div>
                            <div className="flex flex-col">
                                <p className="py-2 text-xs text-gray-400">
                                    <span className="font-semibold text-gray-600">{comment.author}</span>
                                    {" "}
                                    • <TimeAgo date={comment.created_at} />
                                </p>
                                <p>{comment.text}</p>
                            </div>
                        </div>
                    ))}
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

  const comments:any = await commentService.getCommentsByPostId(post?.data?.id)

  const user:any = await userService.searchUserById(post?.data?.authorId)

  const label:any = await labelService.getLabelById(post?.data?.label_id)

  return {
    props: {
      post: post.data || {},
      user: user.data || {},
      label: label || {},
      comments: comments || [],
    }
  }
}


export default Post;