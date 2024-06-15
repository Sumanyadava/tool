import React, { useState } from "react";
import ImpUrg from "./ImpUrg";
import { useDispatch } from "react-redux";
import { longTaskAdd } from "../../action";

const TodoInput = ({ elem, id }) => {
  const [inputInTodo, setInputInTodo] = useState({
    title: "",
    deadline: "",
    tag: "",
  });

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;

  const dispatch = useDispatch();

  const handleTodoInput = () => {
    const trimLongText = inputInTodo.title.trim();
    if (trimLongText.length == 0) {
      alert("write something in long task");
    } else if (inputInTodo.deadline.length == 0) {
      alert("select deadline");
    } else if (inputInTodo.tag.length == 0) {
      alert("write something in select tag");
    } else {
      dispatch(longTaskAdd(id, inputInTodo));

      setInputInTodo({
        title: "",
        deadline: "",
        tag: "",
      });
    }
  };

  return (
    <div>
    <div className="input_long flex flex-col w-full gap-2 p-2 rounded-t-lg shadow-2xl overflow-hidden h-[8vh] group transition-all">
      
      <div className="col_1 w-full flex  justify-around  ">
        <input
          className="input w-[90%] bg-inherit placeholder-black text-xl focus:bg-secondary group-hover:group "
          placeholder={elem}
          value={inputInTodo.title}
          onChange={(e) => {
            setInputInTodo((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>
      <div className="col_2  w-full flex justify-around items-center">
        <div className="tooltip " data-tip="Deadline">
          <input
            type="date"
            placeholder="deadline"
            min={currentDate}
            className="input bg-[#FBCEB1]"
            value={inputInTodo.deadline}
            onChange={(e) => {
              setInputInTodo((prev) => ({ ...prev, deadline: e.target.value }));
            }}
          />
        </div>
        <div className="tooltip bg-secondary p-1 rounded-md" data-tip="Category">
          <ImpUrg setInputInTodo={setInputInTodo} inputInTodo={inputInTodo} />
        </div>

        <button className="btn btn-accent" onClick={handleTodoInput}>
          Add
        </button>
      </div>
    </div>
    </div>
  );
};

export default TodoInput;
