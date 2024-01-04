import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../ContextAPI/MyContext";
import "./Friend.css";
import _ from "lodash";
import axios from "axios";

const Friends = () => {
  const [input, setInput] = useState("");
  const { allUsers, setAllUsers, user } = useContext(MyContext);
  const [toggleButton, setToggleButton] = useState({});
  axios.defaults.withCredentials = true;

   useEffect(() => {
    // Initialize toggleButton with follow status for each user
    const initialToggleButtonState = {};
    console.log(allUsers);
    allUsers?.response?.forEach((ele) => {
      const isFollowed = allUsers.response1.some(
        (e) => (e.userId === ele.userId)
      );
      initialToggleButtonState[ele.userId] = isFollowed;
    });
    setToggleButton(initialToggleButtonState);
  }, [allUsers]);

  const handleChange = async (e) => {
    setInput(e.target.value);
    let response =
      e.target.value &&
      (await axios.get(
        //http://localhost:5000/getUsers//14
        `http://localhost:5000/getUsers/${e.target.value}/${user?.[0]?.userId}`
      ));
    setAllUsers(response.data);
  };
  const handleClick =async  (e) => {
    let receiverId = e.target.id;
    const isToggleButtonActive = toggleButton[receiverId];
    setToggleButton((prev) => ({
      ...prev,
      [receiverId]: !isToggleButtonActive,
    }));
    if (!isToggleButtonActive) {
        await axios.post("http://localhost:5000/sendRequest", {
          user: user?.[0].userId,
          receiverId,
        });
      } else {
        await axios.delete(
          `http://localhost:5000/deleteRequest/${user?.[0].userId}/${receiverId}`
        );
      }
  };
  console.log(toggleButton);

  return (
    <div className="friends">
      <input type="text" placeholder="Enter a name" onChange={handleChange} />
      {input ? (
        <div>
          {allUsers?.response?.length ? (
            allUsers?.response?.map((ele) => {
              if (ele.username !== user?.[0]?.username) {
                return (
                  <div className="userContainer" key={ele.userId}>
                    <img
                      src={ele.profile_pic}
                      height="45px"
                      width="80px"
                      alt="account"
                    />
                    <div className="userDetails">
                      <h3>{ele.username}</h3>
                    </div>
                    {(!toggleButton[ele.userId]) ? (
                      <button
                        className="button btn"
                        onClick={handleClick}
                        id={ele.userId}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className="button btn"
                        onClick={handleClick}
                        id={ele.userId}
                        disabled
                      >
                        UnFollow
                      </button>
                    )}
                  </div>
                );
              }
            })
          ) : (
            <h1>No users Found</h1>
          )}
        </div>
      ) : (
        <h1>Search for a User</h1>
      )}
    </div>
  );
};

export default Friends;