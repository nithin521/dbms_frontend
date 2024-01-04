import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../ContextAPI/MyContext";

const Login = () => {
  const { setNav, setUser,setAdmin,setAllUsers,user } = useContext(MyContext);
  const navigate= useNavigate();
  useEffect(() => {
    async function getUser() {
       let response = await axios.get("http://localhost:5000/getUsers");
       setAllUsers(response.data);
     }
     if(user){
      navigate("/home")
     }
     getUser();
    setNav(false);
  }, []);

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [input, setInput] = useState();
  const [admin, setadmin] = useState(false);
  const [error,setError]= useState('');

  const handleUser = () => {
    setUser(true);
    setadmin(false);
  };
  
  const handleAdmin = () => {
    setadmin(true);
    setUser(false);
  };
  axios.defaults.withCredentials=true

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      let response = await axios.post(`http://localhost:5000/signIn/user`,{userName,password});
      if(response.data.length===0){
        setError("User is not found")
      }
      else{
        setUser(response.data);
        navigate('/home')
      } 
    }
    catch(e){
      console.log(e);
    }
  }

  const handleClick=(e)=>{
    setAdmin(input);
  }

  return (
    <div className="login">
      <div className="parent">
        <div onClick={handleUser} className="user button">
          User
        </div>
        <div onClick={handleAdmin} className="admin button">
          Admin
        </div>
      </div>
      <h3>{error}</h3>
        {admin ? (
          <div className="">
            <input type="number" value={input} placeholder="Enter Your ID" onChange={(e)=>{setInput(e.target.value)}}/>
            <Link to={`/admin/${input}`} state={{ admin }}>
              <button className="button" onClick={handleClick}>Submit</button>
            </Link>
          </div>
        ) : (
          <div className="or">
            <label className="label">Username : </label>
            <input
              type="text"
              placeholder="Enter Your Username"
              onInput={(e) => setUserName(e.target.value)}
              name="username"
            />
            <label className="label">Password : </label>
            <input
              type="password"
              placeholder="Enter Your Password"
              onInput={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
            />
            <h3>Dont have an account <Link to="/signUp" style={{textShadow:"0px 0px black"}}>Create One?</Link></h3>
              <button
                className="button"
                onClick={handleSubmit}
              >
                Submit
              </button>
          </div>
        )}
    </div>
  );
};
export default Login;
