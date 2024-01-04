import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Genre from "./Genre";
import { MyContext } from "../../ContextAPI/MyContext";

const GenreComponent = () => {
  let { genreid } = useParams();
  const { setData,data } = useContext(MyContext);
  useEffect(() => {
    async function getData() {
      try{
        let response = await axios.post(`http://localhost:5000/genre/${genreid}`);
        setData(response.data);
      }
      catch(err){
        console.log(err);
      }
    }
    getData();
  }, [genreid,setData]);

  return (
    <div>
      {
      data?.map((ele) => {
        return(
              <Genre ele={ele} key={"ele"}/>
        )})
      }
    </div>
  );
};

export default GenreComponent;
