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
import Comment from "../../../components/Post/Individual/Comment"
import PostImages from "../../../components/Post/Individual/PostImages"
import {useRouter} from "next/router"
import { postImageService } from 'services/postImage/postImageService';

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
  post: Number,
  author_img: string,
  author_name: string,
}

interface postImages {
  id: Number,
  created_at: Date,
  image_url: string,
  postId: Number
}

interface props {
  post: postData,
  user: any,
  label: label,
  comments: comment[],
  postImages: postImages[],
}

interface Address {
  route: string | undefined,
  city: string | undefined,
  principalSubdivision: string | undefined,
  countryName: string | undefined
}

const Post = (props:props) => {
  const [ address, setAddress ] = useState<Address>({route: "", city: "", principalSubdivision: "", countryName: ""})
  const [ commentsArray, setCommentsArray ] = useState(props.comments)
  const [ refreshCommentsBoolean, setRefreshCommentsBoolean ] = useState(false);
  const router = useRouter();
  const locationLatLng = {lat: props.post.latitude, lng: props.post.longitude}

  async function getFullAddress() {
    const response = await util.addressFromLatitudeAndLongitude(locationLatLng.lat, locationLatLng.lng)
    const address = {
      route: response?.address,
      city: response?.city,
      principalSubdivision: response?.principalSubdivision,
      countryName: response?.country
    }
    setAddress(address)    
  }

  async function refreshComments() {
    const comments:any = await commentService.getCommentsByPostId(router?.query?.postId);
    setCommentsArray(comments)
  }

  useEffect(() => {
    getFullAddress()
  }, [])

  useEffect(() => {
    refreshComments();
  }, [refreshCommentsBoolean])

  return (
    <>
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <Heading title={props.post.title} locationValue={address} imageSrc={props.post.main_image} id={props.post.id}/>
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <Info1 user={props.post.author} category={props.post.type} locationValue={locationLatLng} label={props.label} created_at={props.post.created_at}/>
            <div className="order-1 mb-10 md:order-last md:col-span-3">
              <Price price={props.post.price} />
              <Info2 bedrooms={props.post.bedrooms} restrooms={props.post.restrooms} size={props.post.size}/>
              <p className="mt-10">{address.route}</p>
            </div>
          </div>
          <hr/>
          <h2><b>Descrição</b></h2>
          <p className="text-lg font-light text-neutral-500">{props.post.body}</p>
          <hr/>
          <PostImages images={props.postImages}/>
          <hr/>
          <Comment comments={commentsArray} users={props.post.author} postId={router.query.postId} setRefreshCommentsBoolean={setRefreshCommentsBoolean} refreshCommentsBoolean={refreshCommentsBoolean}/>
        </div>
      </div>
    </>

  )
}

export const getServerSideProps = async(ctx:any) => {
  const id = Object.values(ctx.query)[0];
  const post:any = await postService.searchPostById(id)

  const comments:any = await commentService.getCommentsByPostId(id)

  const label:any = await labelService.getLabelById(post?.data?.label?.id)

  const postImages: any = await postImageService.getImagesPostByPostId(id)

  return {
    props: {
      post: post.data || {},
      label: label || {},
      comments: comments || [],
      postImages: postImages || []
    }
  }
}


export default Post;