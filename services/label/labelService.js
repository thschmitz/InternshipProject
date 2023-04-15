import axios from 'axios';

export const labelService = {
  async getLabelById(id){
    try {
      const response = await axios.get(`http://localhost:8080/labels/${id}`, { 'Content-Type': 'application/json' }).catch(err => {
        console.log("ERR:", err)
      });

      console.log("RESPONSELABEL: ", response)
  
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
}


