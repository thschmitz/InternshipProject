import Geocode from "react-geocode";

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

  addressFromLatitudeAndLongitude(latitude, longitude) {
    console.log("API KEY for address> ", process.env.NEXT_PUBLIC_MAP_API_KEY)
    Geocode.setApiKey(process.env.NEXT_PUBLIC_MAP_API_KEY || "")
    Geocode.setLocationType("ROOFTOP");
    const response = Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        console.log(response)
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "administrative_area_level_2":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country, address)
        return {city, state, country}
      },
      (error) => {
        console.error(error);
      }
    );

    return response;
  }
}


