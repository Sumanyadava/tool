import React from "react";
import ImpUrg from "./ImpUrg";

const TodoInput = ({ ele }) => {
  return (
    <div className="flex flex-col w-full gap-2 bg-red-400 p-2">
      <div className="col_1 w-full flex justify-around">
        <input className="input w-[90%]" placeholder={ele} />
      </div>
      <div className="col_2  w-full flex justify-around items-center">
        <div
          className="tooltip "
          data-tip="Deadline"
        >
          <input type="date" placeholder="deadline" className="input " />
        </div>
        <div
          className="tooltip "
          data-tip="Category"
        >
          <ImpUrg />
        </div>

        <button className="btn btn-secondary">Add</button>
      </div>
    </div>
  );
};

export default TodoInput;
