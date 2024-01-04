import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../ContextAPI/MyContext'
import "./Friend.css"
import { Link } from 'react-router-dom'

const UserFriends = () => {
    const {user}=useContext(MyContext);
    const [data,setData]= useState();

    const handleClick=async (e)=>{
        let friendId= e.target.id;
        setData((data)=>data.filter((ele)=>ele.userId!==parseInt(friendId)));
        await axios.delete(`http://localhost:5000/deleteFriend/${user?.[0]?.userId}/${friendId}`);
    }

    useEffect(()=>{
        async function getUserFreinds(){
            let response = await axios.get(`http://localhost:5000/userFriends/${user?.[0]?.userId}`);
            console.log(response.data);
            let data= await response.data;
            setData(data);
        }
        getUserFreinds()
    },[user])
  return (
    <div>
        {
            data?.map((ele)=>{
                return (
                  <div className="userContainer" key={ele.userId}>
                    <img
                      src={ele.profile_pic}
                      height="45px"
                      width="80px"
                      alt="account"
                    />
                    <div className="userDetails">
                      <h3>{ele.username}</h3>
                    </div>
                    <div className='butt'>
                      <button
                        className="button btn"
                        onClick={handleClick}
                        id={ele.userId}
                      >
                        UnFollow
                      </button>
                      <Link to="/friendStatus" state={ele}>
                      <button
                        className="button btn"
                        id={ele.userId}
                      >
                        See Status
                      </button>
                      </Link>
                    </div>
                  </div>
                );
            })
        }
    </div>
  )
}

export default UserFriends