import React, { useState } from "react";

const Header = ({setItemApp, itemApp , secItem, setSecItem}) => {

  const [input,setInput] = useState("")
  const handleplus = () => {
    
    setItemApp([...itemApp,input])
    setInput("")
  }
  const handleSecPlus = () => {
    setSecItem([...secItem , input])
    setInput("")
  }
  return (


    <div>
      <div className="header w-full   ">
        <div className="navbar bg-base-100 ">
          <div className="flex-none ">
          <div className="tooltip tooltip-right tooltip-secondary" data-tip="documentation link">
            <a className="btn btn-ghost text-xl">longPro</a>
            </div>
          </div>
          <div className="flex-1 justify-center ">
            <label className="input input-bordered flex items-center gap-2 w-[50%] py-7 ">
              <input type="text" className="grow" placeholder="Search" onChange={e => setInput(e.target.value)} value={input}/>
              <div className="tooltip tooltip-bottom" data-tip="short task container">
              <button className="btn  btn-square " onClick={handleplus}>S</button>
              </div>
              <div className="tooltip tooltip-bottom" data-tip="Long Project container">
              <button className="btn  btn-square " onClick={handleSecPlus}>L</button>
              </div>
            </label>
          </div>
          <div className="flex-none gap-3 justify-between ">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10  rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
