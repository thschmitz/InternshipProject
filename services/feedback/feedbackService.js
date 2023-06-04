import axios from 'axios';
import {tokenService} from "../auth/tokenService";

export const feedbackService = {
  async like(postId) {
    try {
      const token = tokenService.get(null);
      const response = await axios.post(`http://localhost:8080/feedbacks/post/${postId}`, {data: null}, { headers: {"Content-Type": "application/json", "JWT": token} })

      return response.data;
    } catch(error) {
      console.log(error)
      return error;
    }
  },
  async checkIfLiked(postId) {
    try {
      const token = tokenService.get(null);
      if(token) {
        const response = await axios.get(`http://localhost:8080/feedbacks/check/post/${postId}`, {headers: {"Content-Type": "application/json", "JWT": token} })
        console.log("RESPOSNE CHECKIFLIKED: ", response.data)

        return response.data;
      } else {
        return false;
      }

      
    } catch(error) {
      console.log(error);

      return error;
    }
  }
}


