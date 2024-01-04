import "./App.css";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./home/Home";
import First from "./user/Books/First";
import History from "./user/History/History"
import Login from "./home/Login";
import AdminDashboard from "./admin/AdminDashboard";
import GenreComponent from "./user/Books/GenreComponent";
import { MyContext } from "./ContextAPI/MyContext";
import { useState } from "react";
import SignUp from "./home/SignUp"
import AdminBookUpdate from "./admin/AdminBookUpdate";
import Friends from "./user/friends/Friends";
import UserFriends from "./user/friends/UserFriends";
import Requests from "./user/friends/Requests";
import BookDetails from "./user/Books/BookDetails"
import FriendStatus from "./user/friends/FriendStatus";


function App() {
  const [user, setUser] = useState([]);
  const [recents, setRecents] = useState([]);
  const [allUsers,setAllUsers]=useState();
  const [admin, setAdmin] = useState();
  const [genre, setGenres] = useState();
  const [popular, setPopular] = useState();
  const [recent, setRecent] = useState();
  const [nav, setNav] = useState(true);
  const [data, setData] = useState();
  const [pagy, setpagy] = useState(1);
  const [lightTheme, setLightTheme] = useState("isLight");

  const contextValue = {
    user,
    setUser,
    genre,
    setGenres,
    popular,
    setPopular,
    recent,
    setRecent,
    data,
    recents,setRecents,
    setData,
    nav,
    setNav,
    admin,
    setAdmin,
    lightTheme,
    setLightTheme,
    allUsers,setAllUsers,pagy,setpagy
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route index element={<Login />} />
        <Route path="/genre/:genreid" element={<GenreComponent />} />
        <Route path="/history" element={<History />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* <Route path="/recent" element={<Recent />} /> */}
        <Route path="/home" element={<First />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/bookDetails" element={<BookDetails />} />
        <Route path="/friendStatus" element={<FriendStatus />} />
        <Route path="/userFriends" element={<UserFriends />} />
        <Route path="/admin/:adminId" element={<AdminDashboard />} />
        <Route path="/admin/update/:bookId" element={<AdminBookUpdate />} />
      </Route>
    )
  );
  return (
    <MyContext.Provider value={contextValue}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;
