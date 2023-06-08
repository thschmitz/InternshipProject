import axios from 'axios';

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
}


