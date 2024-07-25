import React, { useState } from "react";
import ImpUrg from "./ImpUrg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editLongTodo, removeLongTodo } from "../../redux/slices/longSlices";
import { addLongTask } from "../../redux/slices/longSlices";
import axios from "axios";

const TodoInput = ({ elem, decoded,todoname }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [inputInTodo, setInputInTodo] = useState({
    title: "",
    deadline: "",
    tag: "",
  });

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let year = date.getFullYear();

  let currentDate = `${year}-${month}-${day}`;

  const dispatch = useDispatch();

  const handleTodoInput = async () => {
    const trimLongText = inputInTodo.title.trim();
    if (trimLongText.length == 0) {
      toast.error("write something in long task");
    } else if (inputInTodo.deadline.length == 0) {
      toast.error("select deadline");
    } else if (inputInTodo.tag.length == 0) {
      toast.error("write something in select tag");
    } else {
      await axios
        .post(apiUrl+"/api/long/addtask", {
          userId: decoded?.userID,
          todoId: elem.id,
          plannertitle: trimLongText,
          deadline: inputInTodo.deadline,
          impurg: inputInTodo.tag,
          milestone: [],
          plantext: "",
        })
        .then((res) => {
          // console.log(res.data.task);
          const lTaskRes = res?.data.task;
          dispatch(
            addLongTask({
              todoId: elem.id,
              taskId: lTaskRes.id,
              plannertitle: trimLongText,
              deadline: inputInTodo.deadline,
              impurg: inputInTodo.tag,
              milestone:[],
              plantext:lTaskRes.plaintext,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });

      setInputInTodo({
        title: "",
        deadline: "",
        tag: "",
      });
    }
  };

  const handleEditTodo = async () => {
    const editTodoVar = prompt("Edit your task", elem.longname).trim();
    if (editTodoVar.length == 0) {
      toast.error("edit failed as you write nothing");
    } else {
      await axios
        .post(apiUrl+"/api/long/edit", {
          userId: decoded?.userID,
          todoId: elem.id,
          newLongname: editTodoVar,
        })
        .then((res) => {
          // console.log(res);
          dispatch(editLongTodo({ id: elem.id, longname: editTodoVar }));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteTodo = async () => {
    await axios.delete(apiUrl+"/api/long/deletetodo", {
      data: {
        userId: decoded?.userID,
        todoId: elem.id,
      },
    }).then((res) =>{
      dispatch(removeLongTodo(elem.id))
    })

    console.log("Todo deleted successfully:", response.data);
  };

  return (
    <div>
      <div className="input_long flex flex-col w-full gap-2 p-2 rounded-t-lg shadow-2xl overflow-hidden h-16 group transition-all">
        <div className="col_1 w-full flex  justify-evenly  ">
          <input
            className="input w-[75%] bg-inherit placeholder-black text-xl focus:bg-secondary group-hover:group "
            placeholder={elem.longname}
            value={inputInTodo.title}
            onChange={(e) => {
              setInputInTodo((prev) => ({ ...prev, title: e.target.value }));
            }}
          />

          <div className="flex flex-col gap-2">
            <button
              className="bg-neutral h-5 w-8 rounded-sm  text-secondary"
              onClick={handleDeleteTodo}
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
