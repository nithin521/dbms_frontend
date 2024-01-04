import React, { useContext, useEffect } from "react";
import axios from "axios";
import "../user/nav/Nav.css";
import { Link } from "react-router-dom";
import { MyContext } from "../ContextAPI/MyContext";

const AdminNav = () => {
  const { user, setGenres,admin } = useContext(MyContext);
  console.log(user);

  useEffect(() => {
    async function getGenre() {
      let response = await axios.get("http://localhost:5000/");
      let genres = response.data.genre;
      setGenres(genres);
    }
    getGenre();
  }, []);

  return (
    <div className="nav">
      <base href="/"></base>
      <Link to={`/admin/${admin}`}>
        <img src="images/logo.jpg" alt="logo" height="60px" />
      </Link>
      <div className="menu">
        <div className="imageContainer">
          <img
            src="images/account1.png"
            height="45px"
            width="80px"
            alt="account"
          />
          <div className="Ldropdown">
            <h3>{user?.[0]?.username}</h3>
            <Link to="/" style={{ textDecoration: "none" }}>
              <h3 className="link">Logout</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
