import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shortTodoAdd, longTodoAdd } from "../action/index";

const Header = () => {
  const [inputSearch, setInputSearch] = useState("");

  const longTodoArray = useSelector((state) => state.longTodoReducer);
  const shortTodoArray = useSelector((state) => state.shortTodoReducer);

  const dispatch = useDispatch();

  const handleLongSearch = () => {
    if (inputSearch.trim().length == 0) {
      alert("write some thing");
    } else {
      dispatch(longTodoAdd(inputSearch.trim()));
      setInputSearch("");
    }
  };

  const handleShortSearch = () => {
    if (inputSearch.trim().length == 0) {
      alert("write some thing");
    } else {
      dispatch(shortTodoAdd(inputSearch.trim()));
      setInputSearch("");
    }
  };

  return (
    <div>
      <div className="header w-full   ">
        <div className="navbar glass bg-primary">
          <div className="flex-none ">
            <div
              className="tooltip tooltip-right tooltip-secondary"
              data-tip="documentation link"
            >
              <a className="btn btn-ghost text-xl ">LongPro</a>
            </div>
          </div>
          <div className="flex-1 justify-center ">
            <label className="input input-bordered flex items-center gap-2 w-[60%] py-7 bg-secondary ">
              <input
                type="text"
                className="grow text-black"
                placeholder="Search"
                onChange={(e) => setInputSearch(e.target.value)}
                value={inputSearch}
              />
              <div
                className="tooltip tooltip-bottom"
                data-tip="short task container"
              >
                <button
                  className="btn  btn-square btn-neutral "
                  onClick={handleShortSearch}
                >
                  S
                </button>
              </div>
              <div
                className="tooltip tooltip-bottom"
                data-tip="Long Project container"
              >
                <button className="btn  btn-square btn-accent " onClick={handleLongSearch}>
                  L
                </button>
              </div>
            </label>
          </div>

            {inputSearch.trim().length !== 0 && (<>
          <div className="search_filter absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4  rounded-lg flex flex-col bg-info">
            <div className="long_list bg-red-50  ">
              {longTodoArray
                .filter((todo) =>
                  todo.toLowerCase().includes(inputSearch.trim().toLowerCase())
                )
                .map((todo, index) => (
                  <div className="" key={index}>
                    {todo}
                  </div>
                ))}
            </div>

            <div className="short_list">
              {shortTodoArray
                .filter((todo) =>
                  todo.toLowerCase().includes(inputSearch.trim().toLowerCase())
                )
                .map((todo, index) => (
                  <div key={index}>{todo}</div>
                ))}
            </div>


          </div>
            </>)}

          <button className="btn btn-accent   ">
            <h2>LogOut</h2>
          </button>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
