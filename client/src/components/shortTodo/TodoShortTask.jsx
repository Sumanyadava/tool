import React, { useState } from "react";

const TodoShortTask = ({ele}) => {
  const [check, setCheck] = useState(false);
  return (
    <div className="">
      <div
        className={`subtodo_short flex justify-around  bg-blue-50 items-center p-2 m-4 transition-all duration-500 ease-in gap-4 ${
          check ? "bg-green-200" : ""
        } `}
      >
        <input
          type="checkbox"
          name=""
          id=""
          className="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
        />
        <h2 className={`text-xl cursor-pointer`} onClick={() => setCheck(!check)}>
          {ele}
        </h2>
      {check ? <button className="btn btn-outline">Hide</button> : <button className="btn">Edit</button>}
      </div>
    </div>
  );
};

export default TodoShortTask;
