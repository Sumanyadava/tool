import React, { useState } from "react";
import { Reorder } from "framer-motion";
import Todo from "./Todo";

const Main = ({ itemApp, secItem }) => {
  return (
    <div>
      <div className="layout w-full  flex flex-wrap justify-center gap-10 py-10">

        {itemApp.map((ele, index) => {
          return (
            <div className="card w-96 h-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{ele}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          );
        })}

        {secItem.map((eele) => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{eele}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
          );
        })}

        <Todo />
      </div>
    </div>
  );
};

export default Main;
