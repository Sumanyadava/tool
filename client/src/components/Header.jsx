import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addTodo } from "../redux/slices/shortSlices";
import { addLong } from "../redux/slices/longSlices";
import axios from "axios"
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";



const Header = ({decoded}) => {

  const API = "http://localhost:3002/api/todo"
  

  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [userData, setUserData] = useState([""]);
  const [inputSearch, setInputSearch] = useState("");
  
  const handleAll = () => {
    axios
      .get("http://localhost:3002/api/auth/all")
      .then((data) => {
        console.log(data.data);
        setUserData(data.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("server error");
      });
  };

  const handleLogout = () => {
    cookies.remove("jwt_auth", { path: "/" });
    navigate("/");
  };


  const userID = decoded?.userID

  const handleLongSearch = () => {
    if (inputSearch.trim().length == 0) {
      toast.error("write something");
    } else {
      dispatch(addLong(inputSearch.trim()))
      setInputSearch("");
    }
  };

  const handleShortSearch = () => {
    if (inputSearch.trim().length == 0) {
      toast.error("write something");
    } else {
      /*
      axios
      .post(API+"/createshorttodo", {
        userId:userID,
        shortname:"shortTodo45"
        
      }
      ).then((res) => {
        console.log(res);
        
        
      })
      .catch((err) => {
        console.log(err);
      });
      */
     /*
      dispatch(longTodoAdd(inputSearch.trim()));
      setInputSearch("");

      dispatch(shortTodoAdd(inputSearch.trim()));
      setInputSearch("");

      */

      dispatch(addTodo(inputSearch.trim()))
      setInputSearch("");
    }
  };

  return (
    <div>
      <div className="header w-full   ">
        <div className="navbar glass bg-primary relative z-0 ">
          <div className="flex-none ">

            <div
              className="tooltip tooltip-right tooltip-secondary"
              data-tip="documentation link"
            >
              <a className="btn btn-ghost text-xl ">LongPro </a>
            </div>
          </div>
          <div className="flex-1 justify-center ">
            <label className="input input-bordered flex items-center gap-2 w-[60%] py-7 bg-secondary ">
              <input
                type="text"
                className="grow text-black w-[50%]"
                placeholder="Search"
                onChange={(e) => setInputSearch(e.target.value)}
                value={inputSearch}
              />
              <div
                className="tooltip tooltip-bottom"
                data-tip="short task "
              >
                <button
                  className="btn  btn-square btn-neutral "
                  onClick={handleShortSearch}
                >
                  S
                </button>
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Long Project "
              >
                <button
                  className="btn  btn-square btn-accent "
                  onClick={handleLongSearch}
                >
                  L
                </button>
              </div>
            </label>
          </div>

          {inputSearch.trim().length !== 0 && (
            <div className="search_filter absolute top-28 left-1/2  -translate-x-1/2 p-4 w-[30%]  rounded-lg bg-accent font-semibold flex justify-evenly ">
              <div className="long_list bg-red-50 w-[50%] p-2 m-2 rounded-lg ">
                
                {/*
                longTodoArray
                  .filter((todo) =>
                    todo
                      .toLowerCase()
                      .includes(inputSearch.trim().toLowerCase())
                  )
                  .map((todo, index) => (
                    <div className="hover:bg-red-200 cursor-pointer rounded-lg pl-2" key={index}>
                      {todo}
                    </div>
                  ))
                  
                  */}
              </div>

              <div className="short_list ">
                {
                
                /*shortTodoArray
                  .filter((todo) =>
                    todo
                      .toLowerCase()
                      .includes(inputSearch.trim().toLowerCase())
                  )
                  .map((todo, index) => (
                    <div key={index} className="hover:bg-red-200 cursor-pointer rounded-lg pl-2">{todo}</div>
                  ))
                    
                  */}
              </div>
              <button className="btn btn-circle btn-neutral" onClick={() => {setInputSearch("")}}>X</button>
            </div>
          )}

          <button className="btn btn-accent " onClick={handleLogout}>
            <h2>LogOut</h2>
          </button>
          <div className=""></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
