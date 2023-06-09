import axios from 'axios';
import {tokenService} from "../auth/tokenService";

export const commentService = {
  async getCommentsByPostId(postId) {
    try {
      const response = await axios.get(`http://localhost:8080/comments/post/${postId}`, { headers: {"Content-Type": "application/json"} })

      console.log("COMENTARIOS: ", response.data)

      return response.data;
    } catch(error) {
      return error;
    }
  },

  async comment(text, postId) {
    try {
      const token = tokenService.get(null);
      const response = await axios.post(`http://localhost:8080/comments/${postId}`, {text: text}, {headers: {"Content-Type": "application/json", "JWT": token}})

      console.log(response.data);

      return response.data;

    } catch(error) {
      console.log(error);
      return error;
    }
  }
}


