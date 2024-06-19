import React, { useEffect, useState } from "react";
import TodoShortTask from "../shortTodo/TodoShortTask";
import { useSelector ,useDispatch } from "react-redux";
import { shortTaskAdd } from "../../action";

const DetailShort = ({ elem, id }) => {
  const [shortText, setShortText] = useState("");
  const dispatch = useDispatch()


  const shortTaskArray = useSelector(state => state.shortTaskReducer[id]) || []
  const editShort = useSelector(state => state.editTaskShortReducer )

  useEffect(() => {
    if (editShort.task == 'default Edit') {
      setShortText("")
    }else if (id == editShort.id) {
      setShortText(editShort.task)
    }
  }, [editShort])
  

  

  const handleShortTask = () => {
    const trimText = shortText.trim()
    if (trimText.length == 0) {
      alert("write something in short task");
    } else {
      dispatch(shortTaskAdd(id,trimText))
      // console.log(id,shortText,shortTaskArray)
      setShortText("")
    
      
    }
  };



  return (
    <div className="h-full ">
      <div className=" h-full w-full bg-info ">
        <div className="input_short flex justify-around ">
          <input
            type="text"
            className=" bg-inherit placeholder-black text-xl focus:bg-secondary cursor-pointer"
            placeholder={elem}
            onChange={(e) => {
              setShortText(e.target.value);
            }}
            value={shortText}
          />
          <button className="btn btn-neutral" onClick={handleShortTask}>
            Add 
          </button>
        </div>
        <div className="overflow-y-scroll h-[90%] no-scrollbar">
          
          {shortTaskArray.map((ele, index ) => {
            return <TodoShortTask key={index} ele={ele}  id={id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailShort;
