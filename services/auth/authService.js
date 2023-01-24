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
    console.log("Token: ", token);
    try{
      const response = axios.get("http://localhost:8080/users/session", {headers: {"JWT": token}}).then((resp) => resp)

      return response;
    } catch(error) {
      console.log(error);
    }

  }
}


