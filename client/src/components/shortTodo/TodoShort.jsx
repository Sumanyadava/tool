import React, { useEffect, useState } from "react";
import TodoShortTask from "./TodoShortTask";
import { useSelector, useDispatch } from "react-redux";
import { editTodo, removeTodo,addTask } from "../../redux/slices/shortSlices";

import axios from "axios";
import { toast } from "react-toastify";

const TodoShort = ({ elem, decoded,tasks }) => {

  const apiUrl = import.meta.env.VITE_API_URL;
  const [shortText, setShortText] = useState("");
  const dispatch = useDispatch();

  
  
    // Use useSelector to access tasks from the Redux store
    const todos = useSelector((state) => 
      state.short.todos
    ); 
  

  
  const handleShortAddTask = async() => {
    const trimText = shortText.trim();
    if (trimText.length == 0) {
      toast.error("write something in short task");
    } else {
      await axios.post(
        apiUrl + "/api/todo/addtaskshort",
        {
          userId: decoded?.userID,
          shortname: elem.shortname,
          tname:trimText,
        },
        
      ).then(res => {
        // console.log(res.data.task.id)
        dispatch(addTask({ todoId: elem.id, taskText: trimText,taskId: res.data.task.id }));
        
        setShortText("");
      }).catch(err =>{
        toast.error('alredy same task ')
      })
    }
  };

  const handleEditTodoShort = async () => {
    try {
      const editTodoVar = prompt("Edit your task", elem.shortname).trim();
      if (editTodoVar.length == 0) {
        toast.error("edit failed as you write nothing");
      } else {
        await axios.put(
          apiUrl +"/api/todo/edit",
          {
            shortname: editTodoVar,
          },
          {
            params: {
              userId: decoded?.userID,
              todoId: elem.id,
            },
          }
        ).then(res => {
          dispatch(editTodo({ id: elem.id, shortname: editTodoVar }));
          toast.success("Todo edited successfully");
        })

        

        
      }
    } catch (error) {
      // console.error("Error editing todo:", error);
      toast.error("Failed to edit todo");
    }
  };

  
  const handleDeleteTodo = async () => {
    // console.log(decoded?.userID, elem.id, elem.id);

    try {
      await axios.delete(apiUrl+"/api/todo/delete/", {
        params: {
          userId: decoded?.userID,
          todoId: elem.id,
        },
      });
      dispatch(removeTodo(elem.id));
      toast.success("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div className="">
      <div className=" h-[500px] w-[400px] rounded-xl bg-[#00ccff] ">
        <div className="input_short flex justify-around p-6 rounded-t-xl ">
          <input
            type="text"
            className="input bg-inherit placeholder-black text-xl focus:bg-secondary cursor-pointer"
            placeholder={elem.shortname}
            onChange={(e) => {
              setShortText(e.target.value);
            }}
            value={shortText}
          />
          <button className="btn btn-neutral" onClick={handleShortAddTask}>
            Add
          </button>
          <div className="flex flex-col gap-2">
            <button
              className="bg-neutral h-5 w-8 rounded-sm font-bold text-secondary"
              onClick={handleDeleteTodo}
            >
              d
            </button>
            <button
              className=" h-5 w-8 rounded-sm bg-neutral text-secondary"
              onClick={handleEditTodoShort}
            >
              e
            </button>
          </div>
        </div>
        <div className="overflow-y-scroll h-[80%] no-scrollbar  ">
          
          {/*todos.map((ele, index) => {
            return <TodoShortTask key={index} ele={ele} todoId={elem.id} />;
          })*/}

          {
            tasks.map((task) => (
              <TodoShortTask key={task.id} task={task} todoId={elem.id} decoded={decoded}/>
            ))
          }
        </div>
      </div>
      
    </div>
  );
};

export default TodoShort;
