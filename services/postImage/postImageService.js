import {tokenService} from "../auth/tokenService";
import axios from 'axios';

export const postImageService = {
  async insertImagesPost(postId, images){
    try {
      const token = tokenService.get(null);
      console.log(images);
      console.log(token)
      console.log(postId)
      const response = await axios.post(`http://localhost:8080/postimage/${postId}`, images, { headers: {'Content-Type': 'application/json', "JWT": token} })

      console.log(response);

      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
}


