import React, { useContext, useState } from 'react'
import { MyContext } from '../../ContextAPI/MyContext';
import "./Friend.css"
import _ from 'lodash';
import axios from 'axios';

const Friends = () => {
  const[ input,setInput]= useState('');
  const {allUsers,setAllUsers,user}= useContext(MyContext);
  const [toggleButton,setToggleButton]= useState({})
  const handleChange= (async (e)=>{
      setInput(e.target.value);
       let response = await axios.get(
         `http://localhost:5000/getUsers/${e.target.value}`
       );
       setAllUsers(response.data);
      });

  const handleClick=(e)=>{
    
    let receiverId= e.target.id;
    const isToggleButtonActive = toggleButton[receiverId];
    !isToggleButtonActive
    ? axios.post("http://localhost:5000/sendRequest", {
      user: user?.[0].userId,
      receiverId,
    })
    : axios.delete(`http://localhost:5000/deleteRequest/${user?.[0].userId}/${receiverId}`);
     setToggleButton((prevState) => ({
       ...prevState,
       [receiverId]: !isToggleButtonActive,
     }));
  }

  return (
    <div className='friends'>
      <input
        type="text"
        placeholder="Enter a name"
        onChange={handleChange}
      />
      {input ? <div>
        {
         allUsers?.length ? allUsers?.map((ele)=>{
            if(ele.username!==user?.[0]?.username){
               return (
                 <div className="userContainer" key={ele.userId}>
                   <img
                     src="/images/account1.png"
                     height="45px"
                     width="80px"
                     alt="account"
                   />
                   <div className="userDetails">
                     <h3>{ele.username}</h3>
                   </div>
                   {toggleButton[ele.userId] ? (
                     <button
                       className="button btn"
                       onClick={handleClick}
                       id={ele.userId}
                     >
                       Request Sent
                     </button>
                   ) : (
                     <button
                       className="button btn"
                       onClick={handleClick}
                       id={ele.userId}
                     >
                       Send Request
                     </button>
                   )}
                 </div>
               );
            }
          }):<h1>No users Found</h1>
        }
      </div> : <h1>Search for a User</h1>}
    </div>
  );
}

export default Friends