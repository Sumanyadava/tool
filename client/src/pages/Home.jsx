import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";

const Home = ({ decoded }) => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([""]);

  const handleAll = () => {
    axios
      .get("http://localhost:3002/api/auth/all")
      .then((data) => {
        console.log(data.data);
        setUserData(data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("user already exsist");
      });
  };

  const handleLogout = () => {
    cookies.remove("jwt_auth", { path: "/" });
    navigate("/");
  };

  return (
    <div className="abc ">
      <Header decoded={decoded} />

      <Main />
    </div>
  );
};

export default Home;
