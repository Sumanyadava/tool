import React from "react";

const ImpUrg = ({setInputInTodo , inputInTodo}) => {

  const handleRadioTodo = (e) => {
    setInputInTodo((prev) => ({...prev,tag:e.target.value}))
  }
  return (

    
    <div>
      
      <div className="urg grid grid-cols-2">
        <input
          type="radio"
          name="radio-8"
          value="imp & urg"
          className="radio radio-error h-5 w-5 rounded-sm"
          checked={inputInTodo.tag == "imp & urg"}
          onChange={(e) => handleRadioTodo(e)}
        />

        <input
          type="radio"
          name="radio-8"
          value="imp & non urg"
          checked={inputInTodo.tag == "imp & non urg"}
          className="radio radio-warning h-5 w-5 rounded-sm "
          onChange={(e) => handleRadioTodo(e)}
        />

        <input
          type="radio"
          name="radio-8"
          value="non imp & urg"
          checked={inputInTodo.tag == "non imp & urg"}
          className="radio checked:bg-orange-500 h-5 w-5 rounded-sm"
          onChange={(e) => handleRadioTodo(e)}
        />

        <input
          type="radio"
          name="radio-8"
          value="non imp & non urg"
          checked={inputInTodo.tag == "non imp & non urg"}
          className="radio radio-success h-5 w-5 rounded-sm"
          onChange={(e) => handleRadioTodo(e)}
        />
      </div>
    </div>
  );
};

export default ImpUrg;
