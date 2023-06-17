import axios from 'axios';

export const labelService = {
  async getLabelById(id){
    try {
      const response = await axios.get(`http://localhost:8080/labels/${id}`, { 'Content-Type': 'application/json' });

      return response.data;
    } catch (error) {
      console.error(error);

      return error;
    }
  },

  async  getAllLabels() {
    try {
      const response = await axios.get(`http://localhost:8080/labels`, {'Content-Type': 'application/json'}).catch(err => {
        console.log("ERROR: ", err)
      })

      return response.data;
    } catch(error) {
      console.log(error);

      return error;
    }
  }
}


