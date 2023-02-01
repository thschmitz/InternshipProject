import React, {useState} from 'react';

export const Filters = () => {
  let filters = [];

  function handleFilterClick(e, filter) {
    e.preventDefault();


    console.log(filters)

    if(filters.includes(filter)){
      console.log("Incluso")
      filters.splice(filter)
    } else {
      console.log("Nao esta incluso")
      filters.push(filter)
    }

  }

  return (
    <div className="mt-10 mb-10 flex justify-around">
      <div onClick={(e) => handleFilterClick(e, "Title")}>
        <p>Title</p>
      </div>

      <div onClick={(e) => handleFilterClick(e, "Body")}>
        <p>Body</p>
      </div>

      <div onClick={(e) => handleFilterClick(e, "User")}>
        <p>User</p>
      </div>
    </div>
  )
}