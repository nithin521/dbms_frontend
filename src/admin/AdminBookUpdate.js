import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminNav from './AdminNav';
import { MyContext } from '../ContextAPI/MyContext';

const AdminBookUpdate = () => {
    const [data,setData]= useState();
    const [title, setTitle] = useState();
    const [desc, setDesc] = useState();
    const [auth, setAuth] = useState();
    const [image, setImage] = useState();

    const {bookId}= useParams();
    const navigate = useNavigate();
    let {admin:adminId}=useContext(MyContext)
    console.log(adminId);
    useEffect(()=>{
        async function getData(){
            let response = await axios.get(`http://localhost:5000/admin/book/${bookId}`);
            setData(response.data);
            setTitle(response.data?.[0]?.title);
            setDesc(response.data?.[0]?.book_desc);
            setAuth(response.data?.[0]?.author);
            setImage(response.data?.[0]?.image_link);
        }
        getData();
    },[bookId])

    const handleUpdate=async()=>{
      if(title&&desc&&image&&auth){
        alert("Updated Successfully");
        navigate(`/admin/${adminId}`);
        await axios.put(`http://localhost:5000/admin/bookUpdate/${bookId}`,{
          title,desc,auth,image
        });
      }
    }
  return (
    <div>
      <AdminNav />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "calc(100vh - 60px)",
          flexDirection: "column",
          alignItems:"center"
        }}
      >
        <input
          type="text"
          value={title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          style={{
            display: "block",
            margin: "15px auto",
            maxWidth: "700px",
            width: "90%",
            padding: "10px",
            fontSize: "medium",
          }}
        />
        <textarea
          type="text"
          value={desc}
          rows="8"
          name="desc"
          onChange={(e) => setDesc(e.target.value)}
          style={{
            display: "block",
            margin: "15px auto",
            maxWidth: "700px",
            width: "90%",
            borderRadius: "4px",
            padding: "10px",
            fontSize: "large",
            border:"1px solid black"
          }}
        />
        <input
          type="text"
          value={auth}
          name="auth"
          onChange={(e) => setAuth(e.target.value)}
          style={{
            display: "block",
            margin: "15px auto",
            maxWidth: "700px",
            width: "90%",
            padding: "10px",
            fontSize: "medium",
          }}
        />
        <input
          type="text"
          value={image}
          name="image"
          onChange={(e) => setImage(e.target.value)}
          style={{
            display: "block",
            margin: "15px auto",
            maxWidth: "700px",
            width: "90%",
            padding: "10px",
            fontSize: "medium",
          }}
        />
      <button style={{maxWidth:"725px",width:"90%",padding:"15px 25px",borderRadius:"7px",marginTop:"20px",background:"lightgrey",fontWeight:"900",fontSize:"larger",color:"blueviolet"} } onClick={handleUpdate} >Update</button>
      </div>
    </div>
  );
}

export default AdminBookUpdate