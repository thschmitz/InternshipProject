import {tokenService} from "../auth/tokenService";
import axios from 'axios';

export const postService = {
  async searchAllPosts(){
    try {
      const response = await axios.get('http://localhost:8080/posts', { 'Content-Type': 'application/json' }).catch(err => {
        console.log("ERR:", err)
      });

      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  async searchPostsByQuery(search) {
    try{
      const response = await axios.get(`http://localhost:8080/posts/titlesearch?text=${search}`)

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async searchPostsByBody(body) {
    try {
      const response = await axios.get(`http://localhost:8080/posts/bodysearch?text=${body}`)

      return response.data;
    } catch(error) {
      console.log(error);
      return error;
    }
  },

  async getPostsByProfileId(id) {
    try {
      const response =  await axios.get(`http://localhost:8080/posts/profile/${id}`)

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async createPost(data) {
    try {
      const token = tokenService.get(null);
      const response = await axios.post(`http://localhost:8080/posts`, {body: data.description, price: data.price, size: data.size, title: data.title, restrooms: data.restrooms, bedrooms: data.bedrooms, type: data.type, latitude: data.latitude, longitude: data.longitude, main_image: data.image, label_id: data.labelId}, { headers: {"Content-Type": "application/json", "JWT": token} })

      return response.data;
    } catch(error) {
      console.log(error);
      return error;
    }
  },

  async getAllImages() {
    try {
      const response = await axios.get(`http://localhost:8080/postimage`, {headers: {"Content-Type": "application/json"}})

      return response.data;
    } catch(error) {
      console.log(error);
      return error;
    }
  },
  
  async updatePost(id, {title, restrooms, bedrooms, size, main_image, price, latitude, longitude, body, type}) {
    try{
      const token = tokenService.get(null);
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

      return response.status;
    } catch(error) {
      console.log(error)
      return error;
    }
  },

  async searchPostById(id) {
    try {
      const response = await axios.get(`http://localhost:8080/posts/${id}`, {headers: {"Content-Type": "application/json"}})

      console.log("Response> postService SerachPostById: ", response.data)

      return response;
    } catch(error) {
      console.log(error)
      return error;
    }
  },

  async generateTextWithChatGPT(string) {
    try{
      const response = await axios.post("http://localhost:8080/posts/send", {message: string}, {headers: {"Content-Type": "application/json"}});

      return response;
    } catch(error) {
      console.log(error)
      return error;
    }
  }
}


