import {tokenService} from "./tokenService";
import axios from 'axios';

export const authService = {
  async login(data){
    try {
      const response = await axios.post('http://localhost:8080/users/login', data, { 'Content-Type': 'application/json' }).catch(err => {
        console.log("ERR:", err)
      });
  
      tokenService.save(response.data)

      const session = await this.session(response.data);
      const userData = await this.userData(session.data.body.id);
  
      return userData;
    } catch (error) {
      console.error(error);
    }
  },
  
  async session(token) {
    try{
      const response = axios.get("http://localhost:8080/users/session", {headers: {"JWT": token}})
      .catch(error => {
        return error;
      }).then(resp => {
        return resp;
      })

      return response;
    } catch(error) {
      console.log(error);
    }

  },

  async userData(id) {
    try{
      const response = await axios.get(`http://localhost:8080/users/${id}`);

      return response.data;
    } catch(error) {
      console.log(error);
    }
  },

  async signUp(data) {
    console.log(data);
    try {
      const response = await axios.post('http://localhost:8080/users', data, { 'Content-Type': 'application/json' });
      console.log("Response.data: ", response);

      tokenService.save(response.data);

      return response.data;
    } catch(error){
      console.log(error);
    }
  }
}