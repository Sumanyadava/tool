import React, { useState } from "react";
import ImpUrg from "./ImpUrg";
import { useDispatch } from "react-redux";
import {  toast } from "react-toastify";
import { editLong, removeLong } from "../../redux/slices/longSlices";
import { addLongTask } from "../../redux/slices/longTaskSlices";

const TodoInput = ({ elem }) => {
  const [inputInTodo, setInputInTodo] = useState({
    title: "",
    deadline: "",
    tag: "",
  });

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  if (day< 10) {
    day = "0" + day
  }
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;

  const dispatch = useDispatch();

  const handleTodoInput = () => {
    const trimLongText = inputInTodo.title.trim();
    if (trimLongText.length == 0) {
      toast.error("write something in long task");
    } else if (inputInTodo.deadline.length == 0) {
      toast.error("select deadline");
    } else if (inputInTodo.tag.length == 0) {
      toast.error("write something in select tag");
    } else {
      dispatch(addLongTask({todoId:elem.id, taskTitle: trimLongText, taskDeadline :inputInTodo.deadline, taskTag:inputInTodo.tag}));

      setInputInTodo({
        title: "",
        deadline: "",
        tag: "",
      });
    }
  };

  const handleEditTodo = () => {
    const editTodoVar = prompt("Edit your task", elem.longtodo).trim();
    if (editTodoVar.length == 0) {
      toast.error("edit failed as you write nothing");
    } else {
      dispatch(editLong({ id: elem.id, longtodo: editTodoVar}));
    }
  };

  return (
    <div>
      <div className="input_long flex flex-col w-full gap-2 p-2 rounded-t-lg shadow-2xl overflow-hidden h-16 group transition-all">
        <div className="col_1 w-full flex  justify-evenly  ">
          <input
            className="input w-[75%] bg-inherit placeholder-black text-xl focus:bg-secondary group-hover:group "
            placeholder={elem.longtodo}
            value={inputInTodo.title}
            onChange={(e) => {
              setInputInTodo((prev) => ({ ...prev, title: e.target.value }));
            }}
          />

          <div className="flex flex-col gap-2">
            <button
              className="bg-neutral h-5 w-8 rounded-sm  text-secondary"
              onClick={() => dispatch(removeLong(elem.id))}
            >
              d
            </button>
            <button
              className=" h-5 w-8 rounded-sm bg-neutral text-secondary"
              onClick={handleEditTodo}
            >
              e
            </button>
          </div>
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
                setInputInTodo((prev) => ({
                  ...prev,
                  deadline: e.target.value,
                }));
              }}
            />
          </div>
          <div
            className="tooltip bg-secondary p-1 rounded-md"
            data-tip="Category"
          >
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
