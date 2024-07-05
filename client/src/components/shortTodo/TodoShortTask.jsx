import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { editTask } from "../../redux/slices/shortSlices";
import axios from "axios";

const TodoShortTask = ({ task, todoId, decoded }) => {
  const API = "http://localhost:3002/api/todo";
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  const handleEditShort = async () => {
    console.log("userId:" ,decoded?.userID,
      "todoId:", todoId,
      "taskId:", task.id,
      );
    const editTaskVar = prompt("Edit your task", task.text).trim();
    if (editTaskVar.length == 0) {
      toast.error("edit failed as you write nothing");
    } else {
      await axios
        .put(API + "/edittask", {
          userId: decoded?.userID,
          todoId: todoId,
          taskId: task.id,
          taskText: editTaskVar,
        })
        .then((res) => {
          console.log(res)
          dispatch(
            editTask({ todoId: todoId, taskId: task.id, taskText: editTaskVar })
          );
          toast.success("Todo edited successfully");
        });
    }
  };

  const handleDeleteTask = () => {
    toast.error("cant delete it ");
  };

  return (
    <div className="rounded-xl">
      <div
        className={`subtodo_short flex justify-around  items-center p-2 m-4 transition-all duration-500 ease-in rounded-xl gap-4 ${
          check ? "bg-[#1F75FE]" : "bg-[#99ecff]"
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
        <h2
          className={`text-xl cursor-pointer`}
          onClick={() => setCheck(!check)}
        >
          {task.text}
        </h2>
        {check ? (
          <button className="btn btn-outline" onClick={handleDeleteTask}>
            Hide
          </button>
        ) : (
          <button className="btn bg-[#5fadf6]" onClick={handleEditShort}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoShortTask;
