import {tokenService} from "../auth/tokenService";
import axios from 'axios';

export const postService = {
  async searchAllPosts(){
    try {
      const response = await axios.get('http://localhost:8080/posts', { 'Content-Type': 'application/json' }).catch(err => {
        console.log("ERR:", err)
      });

      console.log("RESPONSEPOSTS: ", response)
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async searchPostsByQuery(search) {
    try{
      const response = await axios.get(`http://localhost:8080/posts/titlesearch?text=${search}`)

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  async searchPostsByBody(body) {
    try {
      const response = await axios.get(`http://localhost:8080/posts/bodysearch?text=${body}`)

      return response.data;
    } catch(error) {
      console.log(error);
    }
  },

  async getPostsByProfileId(id) {
    try {
      const response =  await axios.get(`http://localhost:8080/posts/profile/${id}`)

      console.log("GET SERVER SIDE PROPS POST: ", response.data)

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}


