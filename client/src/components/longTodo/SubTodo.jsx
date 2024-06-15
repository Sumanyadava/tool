import React from "react";
import ImpUrg from "./ImpUrg";

const SubTodo = ({ ele }) => {
  const datecomapare =
    new Date(ele.deadline).setHours(0, 0, 0, 0) -
    new Date().setHours(0, 0, 0, 0);
  const dateformat = Math.ceil(datecomapare / (1000 * 60 * 60 * 24));

  return (
    <>
      <div className="long w-full h-24 bg-gray-50 rounded-badge my-2 flex justify-around items-center">
        <div className="leftside w-[65%] h-full ">
          <div className="content flex items-center justify-center h-full w-full text-black font-semibold text-3xl ">
            <h1 className="indicator">
              {ele.title}
              <span
                className={`indicator-item badge ${
                  ele.tag == "imp & urg"
                    ? "bg-red-500"
                    : ele.tag == "imp & non urg"
                    ? "bg-yellow-500"
                    : ele.tag == "non imp & urg"
                    ? "bg-orange-500"
                    : ele.tag == "non imp & non urg"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                {/* {ele.tag} */}
              </span>
            </h1>
          </div>
        </div>
        <div className="rightside h-[70%] w-[25%] flex items-center justify-center flex-col  bg-neutral rounded-box text-neutral-content ">
          <span className="countdown font-mono text-3xl">
            <span style={{ "--value": dateformat }}></span>
          </span>
          days
        </div>
      </div>
    </>
  );
};

export default SubTodo;
