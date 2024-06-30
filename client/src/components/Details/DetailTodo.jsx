import React, { useState } from "react";
import { Link } from "react-router-dom";
import DetailShort from "./DetailShort";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DetailTodo = () => {
  const [value, setValue] = useState("");

  const [searchParams] = useSearchParams();
  const title = searchParams.get("tittle");

  var toolbarOptions = [
    //the
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    // ["link", "image", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: ["black"] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <div className=" h-screen w-full font-cusT ">
      <div className="details_top bg-gray-700  h-[20%] w-full">
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
        <div className="top_deadline w-full h-[60%] flex justify-evenly items-center ">
          {/* --clock-- */}
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content ">
              <span className="countdown font-bold text-5xl">
                <span style={{ "--value": 15 }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-semibold text-5xl">
                <span style={{ "--value": 10 }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-semibold text-5xl">
                <span style={{ "--value": 24 }}></span>
              </span>
              min
            </div>
            <div className="flex flex-col p-4  bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": 53 }}></span>
              </span>
              sec
            </div>
          </div>
          <h1 className="heading font-semibold text-[4vw] ">
            {title}Changing Suman
          </h1>

        </div>
      </div>
      <div className="details_bottom  flex flex-col md:flex-row ">
        <div className="details_left bg-yellow-200  md:w-2/3 w-full h-[80vh]">
          <h1 className="heading font-semibold text-2xl bg-yellow-600 w-max p-2 m-2 rounded-xl shadow-lg">
            {title}asdasd
          </h1>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-[80%]"
            placeholder="write your documentation here..."
          />
          ;
        </div>
        <div className="details_right bg-blue-300  md:w-1/3 w-full h-[80vh] ">
          <DetailShort elem="milestone" />
        </div>
      </div>
    </div>
  );
};

export default DetailTodo;
