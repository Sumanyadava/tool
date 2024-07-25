import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";

const Login = ({ setJwtToken, jwtToken }) => {

  // const API = "https://toolserver.vercel.app/api/auth/login"
  
  const apiUrl = import.meta.env.VITE_API_URL;
  // console.log(apiUrl);


  const [eye, setEye] = useState("password");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get("togo_auth")) {
      navigate("/home");
    }
  }, [navigate, cookies]);

  const handleshow = () => {
    if (eye === "password") {
      setEye("text");
    } else {
      setEye("password");
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // console.log("login called",apiUrl)

    axios
      .post(`${apiUrl}/api/auth/login`, {
        email: userEmail,
        password: userPassword,
      })
      .then((res) => {
        // console.log(res.data);
        toast.success("Welcome Master");
        const token = res.data.token;
        setJwtToken(token);
        cookies.set("togo_auth", token, { path: "/" });
        navigate("/home");
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.error || "server error";
        toast.error(errorMessage);
        // toast.error("login error")
        console.log(err);
      });
  };
  return (
    <div className="flex h-full w-full text-black font-Rc bg-white ">
      <div className="login_picte h-full  w-[50%] hidden sm:flex justify-center items-center">
        <div className="text-[4vw] font-extrabold text-gray-800">
          <h1 className="login_pict text-gray-600">Start to
             </h1>
          <h1>Track your Progress</h1>
        </div>
      </div>
      <div className="login_message  w-full sm:w-[50%] flex items-center justify-around flex-col">
        {/* <div className="sm:login_pict h-36 w-36"></div> */}
        <div className="login_container  h-[500px] w-[350px] rounded-md  ">
          <h2 className="font-bold  text-5xl p-3">Welcome back !</h2>
          <p className="text-sm p-3  text-gray-500">
            Don't have an account?{" "}
            <Link to="/signin" className="text-black underline">
              Create a new account now.
            </Link>
             It takes less then 30 sec
          </p>

          <form
            autoComplete="on"
            className="p-3 h-[70%] w-full flex flex-col justify-around "
            onSubmit={handleSubmitLogin}
          >
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Email"
              className="bg-inherit border-2 border-gray-400 focus:border-black outline-none text-black font-Robo p-2"
              autoComplete="email"
            />
            <div className="pass relative">
              <input
                type={eye}
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="Password"
                className="bg-inherit w-full border-2 border-gray-400 focus:border-black outline-none p-2 text-black font-Robo"
                autoComplete="current-password"
              />

              <i
                className="absolute right-4 top-2 cursor-pointer text-xl"
                onClick={handleshow}
              >
                {eye == "text" ? <FaEyeSlash /> : <FaEye />}
              </i>
            </div>
            <button className="btn btn-neutral hover:bg-blue-600 " type="submit">
              Login
            </button>
            <button
              className="btn btn-disabled border-black text-black hover:bg-gray-300 bg-inherit"
              onClick={() => {
                toast.error("not integrated");
              }}
            >
              <FaGoogle />
              Login with Google{" "}
            </button>
            <p className="text-center text-gray-400">
              Forgot Password{" "}
              <Link to="/signin" className="text-black underline">
                Click here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
