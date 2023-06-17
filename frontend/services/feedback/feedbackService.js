import axios from 'axios';
import {tokenService} from "../auth/tokenService";

export const feedbackService = {
  async like(postId) {
    try {
      const token = tokenService.get(null);
      const response = await axios.post(`http://localhost:8080/feedbacks/post/${postId}`, {data: null}, { headers: {"Content-Type": "application/json", "JWT": token} })

      return response.data;
    } catch(error) {
      return error;
    }
  },
  async checkIfLiked(postId) {
    try {
      const token = tokenService.get(null);
      if(token) {
        const response = await axios.get(`http://localhost:8080/feedbacks/check/post/${postId}`, {headers: {"Content-Type": "application/json", "JWT": token} })

        return response.data;
      } else {
        return false;
      }

      
    } catch(error) {

      return error;
    }
  },

  async getAllFeedbacksByPost(postId) {
    try {
      const response = await axios.get(`http://localhost:8080/feedbacks/post/${postId}`)

      return response.data;
    } catch(error) {
      return error;
    }
  }
}


