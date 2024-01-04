import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./FriendStatus.css"
import { MyContext } from '../../ContextAPI/MyContext';
import axios from 'axios';

const FriendStatus = () => {
    const {state} = useLocation();
    let user= state;
    const [usertables,setUserTables]=useState({completed:[],to_read:[],reading:[],favorites:[]})
    useEffect(()=>{
        let tables=["completed","to_read","reading","favorites"]
        async function getuserTables(){
            let newData=[]
            for(let i=0;i<4;i++){
                let data=await axios.get(`http://localhost:5000/getFriendsLibrary/${tables[i]}/${user.userId}`);
                newData[tables[i]]=data.data;
                setUserTables(newData)
            }
        }
        getuserTables();
    },[user])
    console.log(user);
  return (
    <div className="friendStatus">
      <div className='userDetails'>
        <img src={user.profile_pic} height="45px" width="80px" alt="account" />
        <div className="userDetails">
          <h2>{user.username}</h2>
        </div>
      </div>
      <div className="completedBooks">
        <h2>Completed Books</h2>
        {usertables?.completed.length ? (
          usertables?.completed?.map((ele) => {
            return (
              <div>
                <div className="box" key={ele.book_id}>
                  <div className="innerbox">
                    <div>
                      <img src={ele.image_link} alt="books" />
                    </div>
                  </div>
                  <div className="title">
                    <h3 className="link">
                      <strong>{ele.title}</strong>
                    </h3>
                  </div>
                  <div className="description">
                    <h5>{ele.book_desc}</h5>
                  </div>
                  <div className="author">
                    <h5>
                      Author : <span>{ele.author}</span>
                    </h5>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No books found !</h3>
        )}
      </div>

      <div className="favorites">
        <h2>Favorite Books</h2>
        {usertables?.favorites?.length ? (
          usertables?.favorites?.map((ele) => {
            return (
              <div className="box" key={ele.book_id}>
                <div className="innerbox">
                  <div>
                    <img src={ele.image_link} alt="books" />
                  </div>
                </div>
                <div className="title">
                  <h3 className="link">
                    <strong>{ele.title}</strong>
                  </h3>
                </div>
                <div className="description">
                  <h5>{ele.book_desc}</h5>
                </div>
                <div className="author">
                  <h5>
                    Author : <span>{ele.author}</span>
                  </h5>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No books found !</h3>
        )}
      </div>
      <div className="reading">
        <h2>Reading Books</h2>
        {usertables?.completed.length ? (
          usertables?.completed?.map((ele) => {
            return (
              <div>
                <div className="box" key={ele.book_id}>
                  <div className="innerbox">
                    <div>
                      <img src={ele.image_link} alt="books" />
                    </div>
                  </div>
                  <div className="title">
                    <h3 className="link">
                      <strong>{ele.title}</strong>
                    </h3>
                  </div>
                  <div className="description">
                    <h5>{ele.book_desc}</h5>
                  </div>
                  <div className="author">
                    <h5>
                      Author : <span>{ele.author}</span>
                    </h5>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No books found !</h3>
        )}
      </div>

      <div className="to_read">
        <h2>To Read Books</h2>
        {usertables?.favorites?.length ? (
          usertables?.favorites?.map((ele) => {
            return (
              <div className="box" key={ele.book_id}>
                <div className="innerbox">
                  <div>
                    <img src={ele.image_link} alt="books" />
                  </div>
                </div>
                <div className="title">
                  <h3 className="link">
                    <strong>{ele.title}</strong>
                  </h3>
                </div>
                <div className="description">
                  <h5>{ele.book_desc}</h5>
                </div>
                <div className="author">
                  <h5>
                    Author : <span>{ele.author}</span>
                  </h5>
                </div>
              </div>
            );
          })
        ) : (
          <h3>No books found !</h3>
        )}
      </div>
    </div>
  );
}

export default FriendStatus