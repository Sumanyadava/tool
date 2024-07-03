import React from "react";
import SubTodo from "./SubTodo";
import TodoInput from "./TodoInput";
import { useSelector } from "react-redux";

// codedept change classname

const Todo = ({ elem, id }) => {
  // const longTaskArray = useSelector((state) => state.longTaskReducer[id]) || [];
  return (
    <div>
      <div className="  h-[600px] w-[400px] rounded-xl text-black bg-error overflow-hidden">
        
          <TodoInput elem={elem}  />

          
        
        <div className=" todo_body flex items-start  bg-green-20 flex-col h-[90%]  overflow-y-scroll no-scrollbar ">
          <div className="sort h-5 w-full flex justify-end gap-3 ">
            <input type="radio" name="radio-filter" className="radio h-5 w-5" />

            <input
              type="radio"
              name="radio-filter"
              className="radio radio-error h-5 w-5"
            />

            <input
              type="radio"
              name="radio-filter"
              className="radio radio-warning h-5 w-5"
            />

            <input
              type="radio"
              name="radio-filter"
              className="radio radio-success h-5 w-5"
            />
          </div>

          <div className="body_content w-full px-5 ">
            {/*longTaskArray.map((ele, index) => {
              return <SubTodo key={index} ele={ele} />;
            })*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
