import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [eye, setEye] = useState("password");
  const [passVal, setpassVal] = useState("text-red-300");

  const navigate = useNavigate();

  const handleShow = () => {
    if (eye === "password") {
      setEye("text");
    } else {
      setEye("password");
    }
  };

  const handlePass = (e) => {
    let passdigit = e.target.value;
    setUserPassword(passdigit);

    if (passdigit.length >= 8) {
      setpassVal("text-green-300");
    } else {
      setpassVal("text-red-300");
    }
  };

  const [text] = useTypewriter({
    words: ["Tasks", "Goals", "Side projects", "Habbits","growth","Progress", "Life"],
    loop: {},
  });

  const handleSubmitSign = (e) => {
    e.preventDefault();
    // console.log("signin called")

    if (
      userName.trim().length <= 2 ||
      userEmail.trim() == "" ||
      userPassword.trim().length < 8
    ) {
      toast.error("Please fill all the fields");
    } else {
      axios
        .post("http://localhost:3002/api/auth/register", {
          name: userName,
          email: userEmail,
          password: userPassword,
        })
        .then((data) => {
          toast.success("Signup Success");
          // console.log(userName, userEmail, userPassword);
          setUserName("");
          setUserEmail("");
          setUserPassword("");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("user already exsist signup");
        });
    }
  };

  return (
    <div className="flex h-full w-full text-black bg-white">
      <div className="signup_message  w-full sm:w-[50%] flex items-center justify-around flex-col">
        <div className="signup_container max-h-[600px] w-[400px] rounded-md">
          <form
            action=""
            className="w-full h-full flex flex-col p-5"
            onSubmit={handleSubmitSign}
            autoComplete="on"
          >
            <button
              className="btn btn-disabled border-black text-black hover:bg-gray-100 bg-inherit"
              onClick={() => {
                toast.error("not integrated");
              }}
            >
              <i>
                <FaGoogle />
              </i>
              Signup with Google{" "}
            </button>

            <div className="divider divider-neutral">or</div>
            {/* text field  */}

            <label className="form-control w-full ">
              <div className="label">
                <span className="">Write your name</span>
              </div>
              <input
                type="text"
                placeholder="Name here"
                required
                autoComplete="username"
                className="input input-bordered w-full bg-white "
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </label>

            <label className="form-control w-full mt-2">
              <div className="label">
                <span className="">Write your email</span>
              </div>
              <input
                type="email"
                placeholder="Email here"
                className="peer input input-bordered w-full bg-white "
                required
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
                autoComplete="email"
              />
            </label>

            <label className="form-control w-full mt-2 relative">
              <div className="label">
                <span className="">Write a password</span>
                <span
                  className="label-text-alt cursor-pointer text-xl"
                  onClick={handleShow}
                >
                  {eye == "text" ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <input
                type={eye}
                placeholder="Type here"
                required
                className="peer input input-bordered w-full bg-white "
                value={userPassword}
                onChange={handlePass}
                autoComplete="current-password"
              />

              <span
                className={`invisible peer-focus:visible pl-2 pt-2 label-text-alt  ${passVal}`}
              >
                password must be 8 character long
              </span>
            </label>

            <button className="btn btn-neutral hover:bg-blue-600  mt-9">
              Sign up
            </button>

            <p className=" text-center mt-2">
              Been here before?{" "}
              <Link to="/" className="underline font-bold">
                Login Instead
              </Link>
            </p>
          </form>
        </div>
        <div className="h-32 w-32"></div>
      </div>

      <div className="signup_pict h-full  w-[50%] hidden sm:flex justify-center items-center">
        <div className="moto text-[3vw] ">
          Keep track of your&ensp;
          <span className="moto_change font-semibold">{text}</span>
          <span style={{ color: "rgba(0, 0, 255, 0.7)" }}>
            <Cursor />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
