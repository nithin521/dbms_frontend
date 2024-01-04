import React, { useContext, useEffect, useState } from 'react'
import "./SignUp.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../ContextAPI/MyContext';

const SignUp = () => {

    const {allUsers}= useContext(MyContext)
    
    const navigate= useNavigate();
    
    const [err,setErr]= useState();
    const [user,setUser]= useState('');
    const [pass,setPass]= useState('');
    const [rePass,setRePass]= useState('');
    const [img, setImg] = useState('');

    const handleSubmit=()=>{
        for(let i=0;i<allUsers?.length;i++){
            if(allUsers[i].username===user){
               return setErr("Username already exists");
            }
        }
        if(pass===rePass&&user&&img){
            axios.post("http://localhost:5000/addUser",{user,pass,img})
            navigate("/");
        }
        else{
            if(user.length===0){
                setErr("Username is not defined")
            }
            else if(pass.length===0){
                setErr("Password is empty")
            }
            else if(pass!==rePass){
                setErr("Passwords are not matched")
            }
            else{
                setErr("Image is not uploaded")
            }
        }
    }
  return (
    <div className="signUp ">
        {console.log(allUsers)}
      <h1>Sign Up To Explore Books</h1>
      <h3 style={{color:"red"}}>{err}</h3>
      <h3>Username</h3>
      <input
        type="text"
        placeholder="Create a username..."
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      <h3>Password</h3>
      <input
        type="password"
        placeholder="Enter a password..."
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      <h3>Re-Enter Password</h3>
      <input
        type="password"
        placeholder="Renter password..."
        onChange={(e) => {
          setRePass(e.target.value);
        }}
      />
      <div className="upload">
        <h3>Upload picture : </h3>
        <input
          type="text"
          className="file"
          onChange={(e) => {
            setImg(e?.target?.value);
          }}
        />
      </div>
      <h3>Already have an account ? <Link to='/'>Login Here!</Link></h3>
      <button className="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default SignUp