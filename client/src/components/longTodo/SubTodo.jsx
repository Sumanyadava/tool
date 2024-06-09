import React from "react";
import ImpUrg from "./ImpUrg";

const SubTodo = () => {
  const day = 5
  return (
    <>
      <div className="long w-full h-24 bg-gray-50 rounded-badge my-2 flex justify-around items-center">
        <div className="leftside w-[65%] h-full ">
          <div className="content flex items-center justify-center h-full w-full text-black font-semibold text-3xl ">
            <h1 className="indicator">
            asd asds
            <span className="indicator-item badge bg-yellow-500">imp & urg</span>
            
            </h1>
            
          </div>
        </div>
        <div className="rightside h-[70%] w-[25%] flex items-center justify-center flex-col  bg-neutral rounded-box text-neutral-content ">

          <span className="countdown font-mono text-3xl">
            <span style={{"--value":day}}></span>
          </span>
            days
            
        </div>
      </div>
    </>
  );
};

export default SubTodo;
