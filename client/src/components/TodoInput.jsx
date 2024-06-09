import React from "react";
import ImpUrg from "./ImpUrg";

const TodoInput = () => {
  return (
    <div className="flex flex-col w-full gap-2 bg-red-400 p-2">
      <div className="col_1 w-full flex justify-around">
        
          <input className="input w-[90%]" placeholder="https://da" />
        
      </div>
      <div className="col_2  w-full flex justify-around items-center">
        <input type="date" placeholder="Type here" className="input " />

        <div className="tooltip " data-tip="important and urgent tags see documentation to know more">
          <ImpUrg/>
        </div>

        <button className="btn btn-secondary">Add</button>
      </div>
    </div>
  );
};

export default TodoInput;
