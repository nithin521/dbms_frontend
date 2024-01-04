import axios from "axios";
import React, { useEffect, useState } from "react";
import Books from "../Books/Books";

const Recent = () => {
  const [popular, setPopular] = useState();
  useEffect(() => {
    async function popular() {
      let response = await axios.get("http://localhost:5000/recent");
      console.log(response);
      setPopular(response.data);
    }
    popular();
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <h1
        style={{
          textAlign: "center",
          marginTop: "50px",
          color: "blueviolet",
          letterSpacing: "1px",
        }}
      >
        Recently Uploaded Books
      </h1>
      <div className="books">
        {popular?.map((ele) => {
          return (
           <Books data={ele}/>
          );
        })}
      </div>
    </div>
  );
};

export default Recent;
