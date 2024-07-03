import React, { useEffect, useState } from "react";
import Todo from "./longTodo/Todo";
import TodoShort from "./shortTodo/TodoShort";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Main = () => {

  // reducers 
  const shortArray = useSelector((state) => state.short.todos)
  const longTodoArray = useSelector((state) => state.long.longtodos)

  useEffect(() =>{
    
  })



  
  return (
    <div>
      <div className="layout w-full  flex flex-wrap justify-center gap-10 py-10">

         
        {shortArray.map((ele, index) => {
          
          return (
            <TodoShort elem={ele} key={ele.id}  />
          
          )
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
