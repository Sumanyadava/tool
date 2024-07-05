import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";


const Home = ({ decoded }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([""]);



  const handleLogout = () => {
    cookies.remove("jwt_auth", { path: "/" });
    navigate("/");
  };

  

  return (
    <div className="abc ">
      <Header decoded={decoded} />

      <Main decoded={decoded} />
      
    </div>
  );
};

export default Home;
