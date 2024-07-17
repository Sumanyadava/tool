import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { editTask, iscompleteTask, removeTask } from "../../redux/slices/shortSlices";
import axios from "axios";

const TodoShortTask = ({ task, todoId, decoded }) => {
  const API = "http://localhost:3002/api/todo";
  const [check, setCheck] = useState(task.iscompleted);
  const dispatch = useDispatch();

  const handleEditShort = async () => {
    // console.log(
    //   "userId:",
    //   decoded?.userID,
    //   "todoId:",
    //   todoId,
    //   "taskId:",
    //   task.id
    // );
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
          // console.log(res);
          dispatch(
            editTask({ todoId: todoId, taskId: task.id, taskText: editTaskVar })
          );
          toast.success("Todo edited successfully");
        });
    }
  };

  const handleToggleComplete = async () => {
    try {
      const response = await axios.put(API + "/task/toggle", null, {
        params: { userId: decoded?.userID, todoId: todoId, taskId: task.id },
      });
      // console.log(response.data.message);
      setCheck(!check);
      dispatch(iscompleteTask({ todoId: todoId, taskId: task.id }));
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(`${API}/task/delete/${decoded?.userID}/${todoId}/${task.id}`);
      console.log(response.data.message);
      dispatch(removeTask({ todoId: todoId, taskId: task.id }));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="rounded-xl">
      <div
        className={`subtodo_short flex justify-around  items-center p-2 m-4 transition-all duration-500 ease-in rounded-xl gap-4 ${
          check ? "bg-[#00b7e1] " : "bg-[#ffffff]"
        } `}
      >
        <input
          type="checkbox"
          name=""
          id=""
          className="checkbox"
          checked={check}
          onChange={handleToggleComplete}
        />
        <h2
          className={`text-xl cursor-pointer`}
          onClick={handleToggleComplete}
        >
          {task.text}
        </h2>
        {check ? (
          <button className="btn btn-outline" onClick={handleDeleteTask}>
            Delete
          </button>
        ) : (
          <button className="btn btn-outline " onClick={handleEditShort}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoShortTask;
