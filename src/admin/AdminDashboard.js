import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../ContextAPI/MyContext";
import axios from "axios"
import Books from "../user/Books/Books";
import "./AdminDashboard.css";
import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { admin } = useContext(MyContext);
  const [data, setData] = useState();
  useEffect(() => {
    async function getdata() {
      let response = await axios.get(`http://localhost:5000/admin/${admin}`);
      setData(response.data);
    }
    getdata();
  }, [admin, setData]);
  const handleDelete = async(bookId) => {
    try {
      setData((prevData) => prevData.filter((ele) => ele.book_id !== bookId));
      axios.delete(`http://localhost:5000/admin/${bookId}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {
        <>
          <AdminNav />
          <h1 className="adminH1">Your Books</h1>
          <div className="books">
            {data ? (
              data?.map((ele) => {
                return (
                  <div>
                    <Books data={ele} />
                    <div className="buttons">
                      <Link to={`/admin/update/${ele.book_id}`}>
                      <button>Update Book</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(ele.book_id)}
                        id={ele.book_id}
                      >
                        Delete Book
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Books Found</h1>
            )}
          </div>
        </>
      }
    </div>
  );
};

export default AdminDashboard;
