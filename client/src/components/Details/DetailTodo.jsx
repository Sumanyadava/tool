import React from "react";
import { Link } from "react-router-dom";
import DetailShort from "./DetailShort";
import { useSearchParams } from "react-router-dom"

const DetailTodo = () => {

  const [searchParams] = useSearchParams()
  const title = searchParams.get("tittle")
  return (
    <div className="bg-red-100 h-screen w-full font-cusT">
      <div className="details_top bg-blue-500 h-[20%] w-full">
        <div className="top_header">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{title}</li>
            </ul>
          </div>
        </div>
        <div className="top_deadline w-full h-[60%] flex justify-center">
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content ">
              <span className="countdown font-bold text-7xl">
                <span style={{ "--value": 15 }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-semibold text-7xl">
                <span style={{ "--value": 10 }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-semibold text-7xl">
                <span style={{ "--value": 24 }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-7xl">
                <span style={{ "--value": 53 }}></span>
              </span>
              sec
            </div>
          </div>
        </div>
        <h1 className="heading font-semibold text-2xl">{title}</h1>
      </div>
      <div className="details_bottom h-[80%] flex flex-col-reverse md:flex-row ">
        <div className="details_left bg-red-500 h-full md:w-2/3 w-full">
          write
        </div>
        <div className="details_right bg-blue-300 h-[100%] md:w-1/3 w-full">
          <DetailShort elem='milestone' />
        </div>
      </div>
    </div>
  );
};

export default DetailTodo;
