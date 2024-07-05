import React, { useEffect, useState } from "react";
import Todo from "./longTodo/Todo";
import TodoShort from "./shortTodo/TodoShort";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setTodos } from "../redux/slices/shortSlices";

const Main = ({decoded}) => {
  const dispatch = useDispatch();

  // reducers 
  const shortArray = useSelector((state) => state.short.todos)
  const longTodoArray = useSelector((state) => state.long.longtodos)

  


  useEffect(() =>{

    const handleShortTodo = async() => {
      await axios
        .get("http://localhost:3002/api/todo/alltodo",{
          params:{
            userId:decoded?.userID
          }
        })
        .then((res) => {
          console.log(res.data.data.shortTodos);
          dispatch(setTodos(res.data.data.shortTodos));
          toast.success("send");
        })
        .catch((err) => {
          console.log(err);
          toast.error("cant fetch all todo");
        });
    };


    handleShortTodo()
  },[dispatch])



  
  return (
    <div>
      <div className="layout w-full  flex flex-wrap justify-center gap-10 py-10">

         
        {shortArray.map((ele, index) => {
          // console.log(ele);
          return (
            <TodoShort elem={ele} key={ele.id}  decoded={decoded} />
          
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
