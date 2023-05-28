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

  async  getAllLabels() {
    try {
      const response = await axios.get(`http://localhost:8080/labels`, {'Content-Type': 'application/json'}).catch(err => {
        console.log("ERROR: ", err)
      })

      console.log("Response LABELS: ", response.data)

      return response.data;
    } catch(error) {
      console.log(error);
    }
  }
}


