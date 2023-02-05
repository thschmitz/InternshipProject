export const util = {
  removeDuplicatesFromArray(array){
    console.log(array);
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

}


