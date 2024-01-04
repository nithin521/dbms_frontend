import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../user/nav/Nav";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../ContextAPI/MyContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome" 
import {faMoon} from "@fortawesome/free-solid-svg-icons"
import { faSun } from "@fortawesome/free-regular-svg-icons";
import axios from "axios"
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

import "./Home.css"
const Home = () => {
  const navigate= useNavigate();
  const { nav,lightTheme,setLightTheme,setUser,user } = useContext(MyContext);
  const [light,setLight]= useState(true);
  const[ loading,setLoading]= useState(true)
  const temp="isLight";
  const location= useLocation();
  const handleClick=()=>{
    if(light){
      setLight(false); 
      setLightTheme("isDark");
    }
    else{
      setLight(true);
      setLightTheme(temp);
    }
  }

  useEffect(()=>{
    try {
      async function fetchUser() {
        let result = await axios.get(`http://localhost:5000/signIn/user`);
        setUser(result.data?.user);
        setLoading(false);
        console.log(user);
        if(user===null||user===undefined||user?.length===0){
          navigate("/")
        }
      }
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  },[location.pathname,setUser])

  return (
    <div className={`${lightTheme}`}>
      {nav && <Nav className="nav" />}
      {
        loading?<Loading />:(
          <div>
          <Outlet />
          <div className="iconContainer">
            {light ? (
              <FontAwesomeIcon icon={faMoon} className="icon"  onClick={handleClick}/>
            ) : (
              <FontAwesomeIcon icon={faSun} className="icon"  onClick={handleClick}/>
            )}
          </div>
      </div>
        )
      }
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
