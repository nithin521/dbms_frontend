import React, { useContext, useEffect } from "react";
import "./First.css";
import BookComponent from "./BookComponent";
import axios from "axios";
import _ from "lodash";

import { MyContext } from "../../ContextAPI/MyContext";

const First = () => {
  const { setNav, data, setData,user,setpagy,setUser} = useContext(MyContext);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    setpagy(true);
    setNav(true);
    axios.get("http://localhost:5000").then((res) => setData(res.data.book[0])).catch(err=>console.log(err));
  }, [setData,setNav,setUser,setpagy]);
  const handleInput = _.debounce(async (e) => {
    let inputValue = e.target.value;
    try {
      let response = await axios.post("http://localhost:5000/", {
        input: inputValue,
      });
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }, 500);
  return (
    <div className="first">
      <h2>
        Embark on a literary journey across the globe! Explore a world of
        knowledge, imagination, and stories waiting to be discovered. Use the
        search bar below to delve into an extensive collection of books from
        every corner of the world.{" "}
      </h2>
      <div className="main">
        <input
          type="text"
          placeholder="Enter a book name..."
          name="input"
          onInput={handleInput}
        />
        <button className="button">Explore</button>
      </div>
      <BookComponent data={data}/>
    </div>
  );
};

export default First;
