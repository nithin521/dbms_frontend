import React from "react";
import "./Genre.css";

const Genre = ({ele}) => {

  return (
    <div className="genre">
          <div className="genrediv" key={ele.title}>
            <div className="firstrow">
              <img src={ele.image_link} alt="books" />
              <div className="title">
                <h3>
                  <strong>{ele.title}</strong>
                </h3>
              </div>
            </div>
            <div className="description">
              <h5>{ele.book_desc}</h5>
            </div>
          </div>
    </div>
  );
};

export default Genre;
