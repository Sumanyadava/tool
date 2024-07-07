import React from "react";
import ImpUrg from "./ImpUrg";
import { useNavigate } from "react-router-dom";

const SubTodo = ({ ltask,decoded,todoId , todoname }) => {
  const datecomapare =
    new Date(ltask.deadline).setHours(0, 0, 0, 0) -
    new Date().setHours(0, 0, 0, 0);
  const dateformat = Math.ceil(datecomapare / (1000 * 60 * 60 * 24));

  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 rounded-badge">
      <div className="long w-full h-24 my-2 flex justify-around items-center ">
        <div
          className="leftside w-[65%] h-full "
          onClick={(e) => {
            console.log("longtask",ltask)
            
            navigate("/planner",{
              state:{ltask, decoded,  todoId ,todoname}
            })
          }}
        >
          <div className="content flex items-center justify-center h-full w-full text-black font-semibold text-3xl ">
            <h1 className="indicator">
              {ltask.plannertitle
              }
              <span
                className={`indicator-item badge ${
                  ltask.impurg
                  == "imp & urg"
                    ? "bg-red-500"
                    : ltask.impurg == "imp & non urg"
                    ? "bg-yellow-500"
                    : ltask.impurg == "non imp & urg"
                    ? "bg-orange-500"
                    : ltask.impurg == "non imp & non urg"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              >
                 {ltask.plantext}
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

      <div className="">{/* ---------timeline for v2     */}</div>
      <div className="">{/* ---------github streak for v2     */}</div>
    </div>
  );
};

export default SubTodo;
