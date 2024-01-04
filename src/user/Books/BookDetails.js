import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./BookDetails.css";
import axios from "axios"
import { MyContext } from '../../ContextAPI/MyContext';


const BookDetails = () => {
    const {state}= useLocation();
    const { user ,setUser} = useContext(MyContext);
  const [Data,setData]= useState({Completed:false,To_Read:false,Reading:false,Favorites:false});
  useEffect(()=>{
      async function getuserPreference() {
        try {
          const arr = ["Completed", "To_Read", "Reading", "Favorites"];
          for (const ele of arr) {
            const response = await axios.get(
              `http://localhost:5000/getPreferences/${user?.[0]?.userId}/${ele}/${state.book_id}`
            );
            const data = response.data;
            if (data) {
              setData((prevData) => ({ ...prevData, [ele]: true }));
            }
          }
          await axios.post("http://localhost:5000/addRecent",{
            user:user?.[0]?.userId,
            bookId:state.book_id
          })
        } catch (err) {
          console.log(err);
        }
      }
    getuserPreference();
    console.log(user);
    },[state,user])
    console.log(Data);
    
//   const handleInput = async (e) => {
//     setData((prevData)=>{
//       const updatedDate = {
//         ...prevData,
//         [e.target.id]: !prevData[e.target.id],
//       };
//       if (!Data[e.target.id]) {
//         console.log("went to if");
//        axios.delete(
//         `http://localhost:5000/deletePreferences/${user?.[0]?.userId}/${e.target.id}/${state.book_id}`
//       );
//     } else {
//       console.log("went to else");
//        axios.post("http://localhost:5000/userPreference", {
//         value: e.target.id,
//         user: user?.[0]?.userId,
//         bookId: state.book_id,
//       });
//     }
//     return updatedDate
//     });
// };

// const handleInput = async (e) => {
//   const updatedData = { ...Data, [e.target.id]: !Data[e.target.id] };
//   try {
//     setData(updatedData);
//     if (updatedData[e.target.id]) {
//       await axios.post("http://localhost:5000/userPreference", {
//         value: e.target.id,
//         user: user?.[0]?.userId,
//         bookId: state.book_id,
//       });
//     } else {
//       await axios.delete(
//         `http://localhost:5000/deletePreferences/${user?.[0]?.userId}/${e.target.id}/${state.book_id}`
//       );
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

const handleInput = async (e) => {
  const updatedData = { ...Data, [e.target.id]: !Data[e.target.id] };

  try {
    setData(updatedData);

    if (updatedData[e.target.id]) {
       axios.post("http://localhost:5000/userPreference", {
        value: e.target.id,
        user: user?.[0]?.userId,
        bookId: state.book_id,
      });
    } else {
       axios.delete(
        `http://localhost:5000/deletePreferences/${user?.[0]?.userId}/${e.target.id}/${state.book_id}`
      );
    }
  } catch (error) {
    console.error("Error:", error);
    // If there is an error, revert the state back to its original state
    setData((prevData) => ({ ...prevData, [e.target.id]: !prevData[e.target.id] }));
  }
};


  return (
    <>
      <div className="bookdetails">
        <div className="left">
          <img src={state.image_link} alt="book" />
        </div>
        <div className="right">
          <h2>{state.title}</h2>
          <p>{state.book_desc}</p>
          <div className="innerRight">
            <h5>Pages : {state.pageCount}</h5>
            <h5>Author : {state.author}</h5>
            <h5>Ratings : {state.rating}</h5>
          </div>
        </div>
      </div>
      <h2 style={{color:"maroon"}}>Add to your Section:</h2>
      <div className="bottom">
        <div className="innerLeft">
          {" "}
          <input value="toRead" type="checkbox" id='To_Read'onChange={handleInput} checked={Data.To_Read?true:false}/>
          <span> To Read</span>
        </div>
        <div className="innerLeft">
          {" "}
          <input value="reading" type="checkbox" id='Reading'onChange={handleInput} checked={Data.Reading?true:false}/>
          <span> Reading</span>
        </div>
        <div className="innerLeft">
          {" "}
          <input value="completed" type="checkbox" id='Completed'onChange={handleInput} checked={Data.Completed?true:false}/>
          <span> Completed</span>
        </div>
        <div className="innerLeft">
          <input value="favourites" type="checkbox" id='Favorites'onChange={handleInput} checked={Data.Favorites?true:false}/>
          <span> Favourites</span>
        </div>
      </div>
    </>
  );
}

export default BookDetails