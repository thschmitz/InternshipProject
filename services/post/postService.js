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
      console.log("BODY: ", body)
      const response = await axios.get(`http://localhost:8080/posts/bodysearch?text=${body}`)

      console.log("RESPONSEPOSTSBODY: ", response)

      return response.data;
    } catch(error) {
      console.log(error);
    }
  }
}


