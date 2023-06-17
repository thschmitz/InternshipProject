import {tokenService} from "../auth/tokenService";
import axios from 'axios';

export const postImageService = {
  async insertImagesPost(postId, images){
    try {
      const token = tokenService.get(null);
      const response = await axios.post(`http://localhost:8080/postimage/${postId}`, images, { headers: {'Content-Type': 'application/json', "JWT": token} })

      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async getImagesPostByPostId(postId) {
    try {
      const response = await axios.get(`http://localhost:8080/postimage/${postId}`, { headers: {'Content-Type': 'application/json'}})
      console.log(response.data);

      return response.data;
    } catch(error) {
      console.log(error);
      return error;
    }
  }
}


