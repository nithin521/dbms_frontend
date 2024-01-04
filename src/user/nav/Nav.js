import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Nav.css";
import { Link} from "react-router-dom";
import { MyContext } from "../../ContextAPI/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, setGenres, genre,setUser } = useContext(MyContext);
  const [menu,setMenu]= useState(false);
  const navigate= useNavigate();
  axios.defaults.withCredentials=true;

  useEffect(() => {
    async function getGenre() {
      let response = await axios.get("http://localhost:5000/");
      let genres = response.data.genre;
      setGenres(genres);
    }
    getGenre();
  }, [setGenres]);
  const toggleMenu=()=>{
    menu?setMenu(false):setMenu(true);
  }

  const handleLogOut = async () => {
    try {
      setUser(null); // Assuming setUser is a function to update the user state
      await axios.get("http://localhost:5000/logout");
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="nav">
      <Link to="/home" className="logoDiv">
        <base href="/"></base>
        <img src="images/logo.jpg" alt="logo" height="60px" />
      </Link>
      <div>
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger"
          onClick={toggleMenu}
        />
      </div>
      <div className={`${!menu ? "menu" : "sm"}`}>
        <div className="genre-container">
          <h3 className="genre-menu link">Genres</h3>
          <div className="dropdown">
            {genre?.map((ele) => (
              
              <Link
                to={`genre/${ele.genre_name}`}
                key={ele.genre_name}
                style={{ textDecoration: "none" }}
              >
                <h4 className="link">{ele.genre_name}</h4>
              </Link>
            ))}
          </div>
        </div>
        <Link to="/history" style={{ textDecoration: "none" }}>
          <h3 className="link">My Library</h3>
        </Link>
        <Link to="/friends" style={{ textDecoration: "none" }}>
          <h3 className="link">Find Friends</h3>
        </Link>
        <Link to="/requests" style={{ textDecoration: "none" }}>
          <h3 className="link">Requests</h3>
        </Link>
        {/* <Link to="/recent" style={{ textDecoration: "none" }}>
          <h3 className="link">Most Recent</h3>
        </Link> */}
        <div className="imageContainer">
          <img
            src={user?.[0]?.profile_pic}
            height="45px"
            width="80px"
            alt="account"
          />
          <div className="Ldropdown">
            <Link to="/" style={{ textDecoration: "none" }}>
              <Link to="/userFriends" style={{ textDecoration: "none" }}>
                <h3 className="link">Friends</h3>
              </Link>
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <h3 className="link">Profile</h3>
              </Link>
              <h3 className="link" onClick={handleLogOut}>Logout</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
