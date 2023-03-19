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
  },

  async createPost(data) {
    try {
      const token = tokenService.get(null);
      const response = await axios.post(`http://localhost:8080/posts`, data, { headers: {"Content-Type": "application/json", "JWT": token} })

      console.log(response.data);

      return response.data;
    } catch(error) {
      console.log(error);

      return error;
    }
  },

  async getAllImages() {
    try {
      const response = await axios.get(`http://localhost:8080/postimage`, {headers: {"Content-Type": "application/json"}})


      console.log("Images: ", response.data)

      return response.data;
    } catch(error) {
      console.log(error);

      return error;
    }
  },
  
  async updatePost(id, {title, restrooms, bedrooms, size, main_image, price, latitude, longitude, body, type}) {
    try{
      const token = tokenService.get(null);
      console.log({title, restrooms, bedrooms, size, main_image, price, latitude, longitude, body, type})
      const response = await axios.put(`http://localhost:8080/posts/${id}`, {title, restrooms, bedrooms, size, main_image, price, latitude, longitude, body, type}, {headers: {"Content-Type": "application/json", "JWT": token}})

      console.log(response);

      return response.data;

    } catch(error) {
      console.log(error);
      return error;
    }

  },

  async deletePost(id) {
    try {
      const token = tokenService.get(null);

      const response = await axios.delete(`http://localhost:8080/posts/${id}`, {headers: {"Content-Type": "application/json", "JWT": token}})

      console.log(response)

      return response.status;
    } catch(error) {
      console.log(error)
      return error;
    }
  }
}


