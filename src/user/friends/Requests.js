import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../ContextAPI/MyContext'
import axios from 'axios';
import "./Requests.css"

const Requests = () => {
  const {user}= useContext(MyContext);
  const [requests,setRequests]= useState(null);
  const [toggleButton,setToggleButton]= useState({})
  axios.defaults.withCredentials=true;
  
  useEffect(()=>{
    async function getRequests(){
      let response = await axios.get(`http://localhost:5000/requests/${user?.[0].userId}`);
      let data= await response.data;
      console.log(data);
      data?.freindsId.forEach((ele)=>{
        if(ele.status==="accepted"){
          toggleButton[ele.sender_id]=false;
        }else{
          toggleButton[ele.sender_id] = true;
        }
      })
      setRequests(data);
    }
    getRequests();
  },[user])
  console.log(requests);

  const removeFreind=(e)=>{
    e.preventDefault();
    let rejectedId= e.target.id;
     setRequests((requests) =>({
      ...requests,
       allUsers: requests.allUsers.filter((ele) => ele.userId !== parseInt( rejectedId))
     })
     );
     axios.delete(`http://localhost:5000/reject/${rejectedId}/${user?.[0]?.userId}`)
  } 
  const addFriend=async(e)=>{
    e.preventDefault()
    let addedId= e.target.id;
    setToggleButton((prev)=>({...prev,[addedId]:false}))
     addedId&&
    await axios.post("http://localhost:5000/accepted", {
        addedId,
        userId: user?.[0]?.userId,
      });
  }

  return (
    <div className='requests'>
      {
        requests?.allUsers.length&&requests?.freindsId.length?
          requests.allUsers?.map((ele,index)=>{
            let created_at = requests.freindsId[index].created_at.slice(0,20).replace('T',' ');
            let status= requests.freindsId[index].status;
            let sender_id = requests.freindsId[index].sender_id;
            return (
              <div className="reqContainer">
                <img
                src={ele.profile_pic}
                height="45px"
                width="80px"
                alt="account"
                />
              <div div className="middle">
                <h3>
                  {ele.username} <span> has sent you a request at </span>
                </h3>
                <p>{created_at}</p>
              </div>
              <div className="reqButtons">
                <button
                  className={
                    toggleButton[sender_id]
                      ? "button btn"
                      : "button btn hover"
                  }
                  onClick={addFriend}
                >
                  {toggleButton[sender_id] ? (
                    <p id={ele.userId}>Accept</p>
                  ) : (
                    <p>Accepted</p>
                  )}
                </button>
                {toggleButton[sender_id] && (
                  <button
                    className={
                      status !== "accepted" ? "button btn" : "button btn none"
                    }
                    onClick={removeFreind}
                    id={ele.userId}
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          );}):<h1>No Requests Found</h1>
      }
    </div>
  )
}

export default Requests