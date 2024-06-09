import React, { useState } from "react";

const Header = ({ setsTask, sTask, lTask, setlTask }) => {
  const [input, setInput] = useState("");

  const handleplus = () => {
    setsTask([...sTask, input]);
    setInput("");
  };
  const handleSecPlus = () => {
    setlTask([...lTask, input]);
    setInput("");
  };
  return (
    <div>
      <div className="header w-full   ">
        <div className="navbar bg-base-300 ">
          <div className="flex-none ">
            <div
              className="tooltip tooltip-right tooltip-secondary"
              data-tip="documentation link"
            >
              <a className="btn btn-ghost text-xl">longPro</a>
            </div>
          </div>
          <div className="flex-1 justify-center ">
            <label className="input input-bordered flex items-center gap-2 w-[60%] py-7 ">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <div
                className="tooltip tooltip-bottom"
                data-tip="short task container"
              >
                <button className="btn  btn-square " onClick={handleplus}>
                  S
                </button>
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Long Project container"
              >
                <button className="btn  btn-square " onClick={handleSecPlus}>
                  L
                </button>
              </div>
            </label>
          </div>
          <button className="btn btn-square ">sd</button>
          <div className="">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
