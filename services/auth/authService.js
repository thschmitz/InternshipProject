import {tokenService} from "./tokenService";
import axios from 'axios';

export const authService = {
  async login(data){
    try {
      const response = await axios.post('http://localhost:8080/users/login', data, { 'Content-Type': 'application/json' });
  
      tokenService.save(response.data)
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  
  async session(token) {
    try{
      const response = axios.get("http://localhost:8080/users/session", {headers: {"JWT": token}})
      .catch(error => {
        return error;
      }).then((resp) => {
        return resp;
      })

      return response;
    } catch(error) {
      console.log(error);
    }

  },

  async signUp(data) {
    try {
      const response = await axios.post('http://localhost:8080/users', data, { 'Content-Type': 'application/json' });

      tokenService.save(response.data);

      console.log("Response.data: ", response.data);

      return response.data;
    } catch(error){
      console.log(error);
    }
  }
}


