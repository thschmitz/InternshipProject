import Geocode from "react-geocode";
import axios from "axios"
import OpenLocationCode from 'open-location-code';

export const util = {
  removeDuplicatesFromArray(array){
    array = array.filter((item, index) => array.indexOf(item) === index);

    let new_array = [];

    for(let i = 0; i < array.length; i++) {
      if(array[i].length === 0) {
        array.slice(i)
      } else {
        new_array.push(array[i])
      }
    }

    return new_array;
  },

  async addressFromLatitudeAndLongitude(latitude, longitude) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`

    try {
      const response = await axios.get(url);
      const data = response.data;
      if (data.status === 'OK') {
        const result = data.results[0];
        const addressComponents = result.address_components;
        const address = result.formatted_address;
        let city = '';
        let street = '';
        let principalSubdivision = '';
        let country = '';
  
        for (let i = 0; i < addressComponents.length; i++) {
          const component = addressComponents[i];
          const componentTypes = component.types;
  
          if (componentTypes.includes('administrative_area_level_2')) {
            city = component.long_name;
          } else if (componentTypes.includes('route')) {
            street = component.long_name;
          } else if (componentTypes.includes('administrative_area_level_1')) {
            principalSubdivision = component.long_name;
          } else if (componentTypes.includes('country')) {
            country = component.long_name;
          }
        }
  
        return {
          address,
          city,
          street,
          principalSubdivision,
          country
        };
      }
    } catch (error) {
      console.error('Error retrieving address:', error);
    }
    return null;
  }
}


