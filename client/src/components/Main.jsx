import React, { useEffect, useState } from "react";
import Todo from "./longTodo/Todo";
import TodoShort from "./shortTodo/TodoShort";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { setTodos } from "../redux/slices/shortSlices";
import { setLongTodos } from "../redux/slices/longSlices";

const Main = ({decoded}) => {
  const dispatch = useDispatch();

  // reducers 
  const shortArray = useSelector((state) => state.short.todos)
  const longArray = useSelector((state) => state.long.longTodos)

  


  useEffect(() =>{

    const handleShortTodo = async() => {
      await axios
        .get("http://localhost:3002/api/todo/alltodo",{
          params:{
            userId:decoded?.userID
          }
        })
        .then((res) => {
          // console.log(res.data.data.shortTodos);
          dispatch(setTodos(res.data.data.shortTodos));
          // toast.success("send");
        })
        .catch((err) => {
          console.log(err);
          // toast.error("cant fetch short todo");
        });
    };

    const handleLongTodo = async() => {
      await axios
        .get("http://localhost:3002/api/long/setlong",{
          params:{
            userId:decoded?.userID
          }
        })
        .then((res) => {
          // console.log(res);
          dispatch(setLongTodos(res.data.data.longTodos));
          // toast.success("send");
        })
        .catch((err) => {
          // console.log(err);
          // toast.error("cant fetch all todo");
        });
    }

    const fetchTodos = async () => {
      await handleLongTodo();
      await handleShortTodo();
    };

    if (decoded?.userID) {
      fetchTodos();
    }

    handleShortTodo()
    handleLongTodo()
  },[dispatch,decoded?.userID])



  
  return (
    <div>
      <div className="layout w-full  flex flex-wrap justify-center gap-10 py-10">

         
        {shortArray.map((ele, index) => {
          // console.log(ele);
          return (
            <TodoShort elem={ele} key={ele.id}  decoded={decoded} tasks={ele.tasks} />
          
          )
        })}

        {longArray.map((elem, index) => {
          // console.log(elem);
          return (
          
             <Todo elem={elem} key={elem.id}  decoded={decoded} longtasks={elem.longtasks} />
            
          
          );
        })}

         

         


        
        
      </div>
      
    </div>
  );
};

export default Main;
