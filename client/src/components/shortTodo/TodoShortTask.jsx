import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../redux/slices/shortTaskSlices";
import {toast } from "react-toastify";


const TodoShortTask = ({ele, todoId}) => {
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch()
  
  
  const handleEditShort = () => {
    const editTaskVar = (prompt("Edit your task", ele.text)).trim()
    if (editTaskVar.length == 0) {
      toast.error("edit failed as you write nothing")
    }else{
      dispatch(editTask({todoId:todoId , taskId:ele.id , taskText:editTaskVar}))
      console.log(ele.id )
      
    }
     
    
  }
  const handleDeleteTask = () => {
    toast.error("cant delete it ")
  }

  return (
    <div className="rounded-xl">
      <div
        className={`subtodo_short flex justify-around  items-center p-2 m-4 transition-all duration-500 ease-in rounded-xl gap-4 ${  check ? "bg-[#1F75FE]" : "bg-[#99ecff]" 
          
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
          {ele.text}
        </h2>
      {check ? <button className="btn btn-outline" onClick={handleDeleteTask}>Hide</button> : <button className="btn bg-[#5fadf6]" onClick={handleEditShort}>Edit</button>}
      </div>
    </div>
  );
};

export default TodoShortTask;
