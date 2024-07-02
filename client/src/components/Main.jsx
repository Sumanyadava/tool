import React, { useState } from "react";
import Todo from "./longTodo/Todo";
import TodoShort from "./shortTodo/TodoShort";
import { useSelector } from "react-redux";

const Main = () => {

  // reducers 
  const shortTodoArray = useSelector((state) => state.shortTodoReducer)
  const longTodoArray = useSelector((state) => state.longTodoReducer)

  
  useEffect(() => {
    const gettingdata = async () => {
      try {
        await axios
          .get("http://localhost:3002/api/todo/planner", {
            headers: {
              plannertittle: "Marketing Strategy Q3",
            },
          })
          .then((res) => {
            // console.log(res.data?.message)
            setPlannerTitle(res.data?.message?.plannertitle);
            setValue(res.data?.message?.plantext);
            setImpUrg(res.data?.message?.impurg);
            setMilestone(res.data?.message?.milestone);
            setDeadline(new Date(res.data?.message?.deadline));
          });
      } catch (error) {
        console.log("error here ", error);
      }
    };

    gettingdata();
  }, []);


  
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
