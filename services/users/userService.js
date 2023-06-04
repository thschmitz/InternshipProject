import axios from 'axios';

export const userService = {
  async searchUserByName(name){
    try {
      const response = await axios.get(`http://localhost:8080/users/namesearch?text=${name}`)

      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async searchUserById(id) {
    try {
      const response = await axios.get(`http://localhost:8080/users/${id}`)

      return response;
    } catch(error) {
      console.log(error);
      return error;
    }
  }

}


