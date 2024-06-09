import React, { useState } from "react";
import TodoShortTask from "./TodoShortTask";

const TodoShort = ({ ele }) => {
  const [shortText, setShortText] = useState("");
  const [shortTask, setShortTask] = useState([]);

  const handleShortTask = () => {
    if (shortText !== "") {
      setShortTask([...shortTask, shortText]);
    } else {
      alert("empty");
    }
  };
  return (
    <div className="">
      <div className=" border bg-base-300 h-[500px] w-[400px] rounded-xl">
        <div className="input_short flex justify-around bg-blue-200 p-6 ">
          <input
            type="text"
            className="input"
            placeholder={ele}
            onChange={(e) => {
              setShortText(e.target.value);
            }}
            value={shortText}
          />
          <button className="btn" onClick={handleShortTask}>
            Add
          </button>
        </div>
        <div className="overflow-y-scroll h-[80%]">
          {shortTask.map((ele, index) => {
            return <TodoShortTask key={index} ele={ele} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoShort;
