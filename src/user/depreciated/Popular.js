import axios from "axios";
import React, { useEffect, useState } from "react";
import Books from "../Books/Books";

const Popular = () => {
  const [popular, setPopular] = useState();
  useEffect(() => {
    async function popular() {
      let response = await axios.get("http://localhost:5000/popular");
      console.log(response);
      setPopular(response.data);
    }
    popular();
  }, []);
  console.log(popular);
  return (
    <>
      <h1 className="adminH1">Most Popular Books</h1>
    <div className="books">
      {popular?.map((ele) => {
        return (
          <Books data={ele}/>
        );
      })}
      
    </div>
    </>
  );
};

export default Popular;
