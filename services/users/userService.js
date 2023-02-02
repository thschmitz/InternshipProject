import {tokenService} from "../auth/tokenService";
import axios from 'axios';

export const userService = {
  async searchUserByName(name){
    try {
      const response = await axios.get(`http://localhost:8080/users/namesearch?text=${name}`)

      console.log("RESPONSEUSERSERVICE: ", response.data)

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

}


