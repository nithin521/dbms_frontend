import React, { useEffect, useState } from "react";
import "./History.css";
import LibraryComponent from "./LibraryComponent";

const History = () => {
  const [value, setValue] = useState("recently");
  const [active, setActive] = useState("recently");

  useEffect(()=>{

  },[])

  return (
    <div className="history">
      <div className="left">
        <h3
          onClick={() => {
            setValue("recently");
            setActive("recently");
            return <LibraryComponent val="recently" />;
          }}
          className={active === "recently" ? "active" : ""}
        >
          Recently Viewed
        </h3>
        <h3
          onClick={() => {
            setValue("favorites");
            setActive("favorite");
          }}
          className={active === "favorite" ? "active" : ""}
        >
          Favorites
        </h3>
        <h3
          onClick={() => {
            setValue("to_read");
            setActive("to_read");
          }}
          className={active === "to_read" ? "active" : ""}
        >
          To Read
        </h3>
        <h3
          onClick={() => {
            setValue("reading");
            setActive("reading");
          }}
          className={active === "reading" ? "active" : ""}
        >
          Reading
        </h3>
        <h3
          onClick={() => {
            setValue("completed");
            setActive("completed");
          }}
          className={active === "completed" ? "active" : ""}
        >
          Completed
        </h3>
      </div>
      <div className="right">{<LibraryComponent val={value} />}</div>
    </div>
  );
};

export default History;
