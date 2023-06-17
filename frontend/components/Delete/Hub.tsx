import React, {useState} from 'react';
import { Feed } from "../../components/Feed/Feed.js"
import type { NextPage } from "next";

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
}

const EditHub: NextPage = ({posts, deleted, setDeleted}:any) => {
  const [data, setData] = useState<postData>();

  return(
    <div>
      <div className="max-w-7xl mx-auto items-center flex w-full justify-center mt-32">
        <div className="flex-col">
          <div className="flex">
            <div className="w-full items-center justify-center text-xl">
              <h1 className="font-bold text-5xl mt-5">Qual imóvel você deseja deletar?</h1>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Feed posts={posts} editor={false} deletor={true} setData={setData} deleted={deleted} setDeleted={setDeleted}/>
          </div>
        </div>
      </div>
  </div>
  )
}

export default EditHub;