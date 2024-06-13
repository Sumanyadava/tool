import React, { useState } from "react";
import Todo from "./longTodo/Todo";
import TodoShort from "./shortTodo/TodoShort";
import { useSelector } from "react-redux";

const Main = () => {

  // reducers 
  const shortTodoArray = useSelector((state) => state.shortTodoReducer)
  const longTodoArray = useSelector((state) => state.longTodoReducer)

  


  
  return (
    <div>
      <div className="layout w-full  flex flex-wrap justify-center gap-10 py-10">

        
        {shortTodoArray.map((ele, index) => {
          return (
            <TodoShort elem={ele} key={index} id={index} />
          );
        })}

        {longTodoArray.map((elem, index) => {
          return (
            <Todo elem={elem} key={index} id={index} />

          );
        })}

        


        
        
      </div>
    </div>
  );
};

export default Main;
