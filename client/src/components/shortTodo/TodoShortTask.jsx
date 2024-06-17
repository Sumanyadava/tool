import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { shorttaskedit } from "../../action";

const TodoShortTask = ({ele,id}) => {
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch()

  const handleEditShort = () => {
     
    dispatch(shorttaskedit(id,ele))
    console.log(ele,id)
    
  }
  return (
    <div className="rounded-xl">
      <div
        className={`subtodo_short flex justify-around  items-center p-2 m-4 transition-all duration-500 ease-in gap-4 ${
          check ? "bg-info" : "bg-blue-400"
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
          {ele}
        </h2>
      {check ? <button className="btn btn-outline">Hide</button> : <button className="btn" onClick={handleEditShort}>Edit</button>}
      </div>
    </div>
  );
};

export default TodoShortTask;
