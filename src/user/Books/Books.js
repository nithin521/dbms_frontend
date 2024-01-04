import React from 'react'
import {Link} from "react-router-dom"
import "./Books.css";
const Books = ({data}) => {
  return data&&(
    <div className="box" key={data.book_id}>
      <div className="innerbox">
        <Link
          to="bookdetails"
          state={data}
          style={{ textDecoration: "none" }}
        >
        <div>
          <img src={data.image_link} alt="books" />
        </div>
        </Link>
        <div>
          <div>
            <h5>Ratings </h5>
            <span>: {data.rating}</span>
          </div>
          <div>
            <h5>No.OfPages </h5>
            <span>: {data.pageCount}</span>
          </div>
        </div>
      </div>
      <Link to="/bookdetails" state={data} style={{ textDecoration: "none" }}>
        <div className="title">
          <h3 className="link">
            <strong>{data.title}</strong>
          </h3>
        </div>
      </Link>
      <div className="description">
        <h5>{data.book_desc}</h5>
      </div>
      <div className="author">
        <h5>
          Author : <span>{data.author}</span>
        </h5>
      </div>
    </div>
  );
}

export default Books