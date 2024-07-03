import React, { useEffect, useState } from "react";
import TodoShortTask from "./TodoShortTask";
import { useSelector, useDispatch } from "react-redux";
import { shortTaskAdd } from "../../action";
import { editTodo, removeTodo } from "../../redux/slices/shortSlices";
import { addTask } from "../../redux/slices/shortTaskSlices";
import { ToastContainer, toast } from "react-toastify";


const TodoShort = ({ elem }) => {
  const [shortText, setShortText] = useState("");
  const dispatch = useDispatch();

  
  const shortTaskArray = useSelector(state => state.shorttask[elem.id]) || []


/*
  useEffect(() => {
    if (editShort.task == 'default Edit') {
      setShortText("")
    }else if (id == editShort.id) {
      setShortText(editShort.task)
    }
  }, [editShort])*/
  

  const handleShortTask = () => {
    const trimText = shortText.trim();
    if (trimText.length == 0) {
      toast.error("write something in short task");
    } else {
      dispatch(addTask({todoId:elem.id, taskText:trimText}))
      // console.log(id,shortText,shortTaskArray)
      setShortText("");
    }
  };

  const handleEditTodoShort = () => {
    const editTodoVar = prompt("Edit your task", elem.text).trim();
    if (editTodoVar.length == 0) {
      toast.error("edit failed as you write nothing");
    } else {
      dispatch(editTodo({ id: elem.id, text: editTodoVar}));
    }
  };

  return (
    <div className="">
      <div className=" h-[500px] w-[400px] rounded-xl bg-info ">
        <div className="input_short flex justify-around p-6 rounded-t-xl ">
          <input
            type="text"
            className="input bg-inherit placeholder-black text-xl focus:bg-secondary cursor-pointer"
            placeholder={elem.text}
            onChange={(e) => {
              setShortText(e.target.value);
            }}
            value={shortText}
          />
          <button className="btn btn-neutral" onClick={handleShortTask}>
            Add
          </button>
          <div className="flex flex-col gap-2">
            <button
              className="bg-neutral h-5 w-8 rounded-sm font-bold text-secondary"
              onClick={() => dispatch(removeTodo(elem.id))}
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
        <div className="overflow-y-scroll h-[80%] no-scrollbar">
           {shortTaskArray.map((ele, index ) => {
            return <TodoShortTask key={index} ele={ele} todoId={elem.id}   />;
            
            
          })} 
          

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoShort;
