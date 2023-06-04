import React, {useState} from 'react';
import { postService } from '../../services/post/postService.js';
import { userService } from "../../services/users/userService.js"
import { util } from "../../services/util/util.js"

export const Filters = ({setUserData, setPostsData, searchText}) => {
  const [titleClick, setTitleClick] = useState(true);
  const [bodyClick, setBodyClick] = useState(false);
  const [userClick, setUserClick] = useState(false);

  async function handleApplyFilters(e) {
    e.preventDefault();
    let posts = [];

    if(titleClick || !bodyClick && !userClick) {
      // postData
      const titleResponse = await postService.searchPostsByQuery(searchText);
      posts.push(titleResponse)
    }

    if(bodyClick) {
      const bodyResponse = await postService.searchPostsByBody(searchText);
      posts.push(bodyResponse)
    }
    

    if(userClick) {
      const userResponse = await userService.searchUserByName(searchText);
      setUserData(userResponse)
    } else {
      setUserData([])
    }

    setPostsData(util.removeDuplicatesFromArray(posts));

  } 

  return (
    <div className="flex flex-col">
      <div className="mt-10 mb-10 flex justify-around">
        <div className={`filterItem ${titleClick? "bg-gray-200" : ""}`} onClick={(e) => setTitleClick(!titleClick)}>
          <p>Title</p>
        </div>
        <div className={`filterItem ${bodyClick? "bg-gray-200" : ""}`} onClick={(e) => setBodyClick(!bodyClick)}>
          <p>Body</p>
        </div>
        <div className={`filterItem ${userClick? "bg-gray-200" : ""}`} onClick={(e) => setUserClick(!userClick)}>
          <p>User</p>
        </div>
      </div>
      <div className="text-center justify-center">
        <button type="submit" className="max-w-fit bg-red-400 p-3 rounded-full text-gray-200" onClick={(e) => handleApplyFilters(e)}>Apply filters</button>
      </div>
    </div>
    
  )
}