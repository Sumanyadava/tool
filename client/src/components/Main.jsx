import React, { useState } from "react";
import { Reorder } from "framer-motion";
import Todo from "./longTodo/Todo";
import sTodo from "./shortTodo/TodoShort";
import TodoShort from "./shortTodo/TodoShort";

const Main = ({ sTask, lTask }) => {

  
  const [longText,setLongText] = useState("")

  
  return (
    <div>
      <div className="layout w-full  flex flex-wrap justify-center gap-10 py-10">

        {sTask.map((ele, index) => {
          return (
            <TodoShort ele={ele} key={index} />
          );
        })}

        {lTask.map((ele, index) => {
          return (
            <Todo ele={ele} key={index} />

          );
        })}

        
        
      </div>
    </div>
  );
};

export default Main;
