import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PlannerMilestone from "./PlannerMilestone";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const PlannerPage = () => {
  const [valuePlanner, setValue] = useState("");
  const [plannerTitle, setPlannerTitle] = useState("loading...");
  const [deadline, setDeadline] = useState(new Date());
  const [impUrg, setImpUrg] = useState("loading...");
  const [milestone, setMilestone] = useState([{ id: "1", task: "Loading..." }]);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const title = "tittle";

  useEffect(() => {
    const gettingdata = async () => {
      try {
        await axios
          .get("http://localhost:3002/api/todo/planner", {
            headers: {
              plannertittle: "Marketing Strategy Q3",
            },
          })
          .then((res) => {
            // console.log(res.data?.message)
            setPlannerTitle(res.data?.message?.plannertitle);
            setValue(res.data?.message?.plantext);
            setImpUrg(res.data?.message?.impurg);
            setMilestone(res.data?.message?.milestone);
            setDeadline(new Date(res.data?.message?.deadline));
          });
      } catch (error) {
        console.log("error here ", error);
      }
    };

    gettingdata();
  }, []);

  var toolbarOptions = [
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

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = Math.floor(
        (new Date(deadline) - new Date()) 
      );
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    };
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval); 
  }, [deadline]);


  const handlePlannerSave = async() => {
    const response = await axios.put('http://localhost:3002/api/todo/updateplanner', {
      plannertitle: plannerTitle,
      user:"jane_smith", deadline, impurg:"urg", plantext:valuePlanner
    });
  }
  return (
    <div className=" h-screen w-full font-cusT ">
      {
        console.log(deadline)
        
      }
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
                <span style={{ "--value": days }}></span>
              </span>
              days
            </div>
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-semibold text-5xl">
                <span style={{ "--value": hours }}></span>
              </span>
              hours
            </div>
            <div className="flex flex-col p-4 bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-semibold text-5xl">
                <span style={{ "--value": minutes }}></span>
              </span>
              min
            </div>
            
            {/* <div className="flex flex-col p-4  bg-neutral rounded-box text-neutral-content">
              <span className="countdown font-mono text-5xl">
                <span style={{ "--value": seconds }}></span>
              </span>
              sec
            </div> */}


          </div>
          <h1 className="heading font-semibold text-[4vw] ">{plannerTitle}</h1>
        </div>
      </div>
      <div className="details_bottom  flex flex-col md:flex-row ">
        <div className="details_left bg-yellow-200  md:w-2/3 w-full h-[80vh]">
          <h1 className="heading font-semibold text-2xl bg-yellow-600 w-max p-2 m-2 rounded-xl shadow-lg">
            {impUrg} {}
          </h1>
          <ReactQuill
            theme="snow"
            value={valuePlanner}
            onChange={setValue}
            className="h-[80%] mx-5"
            placeholder="write your documentation here..."
          />
          <div className="btn_wrapper absolute right-16">
            <button className="btn btn-accent m-3">edit</button>
            <button className="btn btn-primary m-3" onClick={handlePlannerSave}>Save</button>
          </div>
        </div>
        <div className="details_right bg-blue-300  md:w-1/3 w-full h-[80vh] ">
          <PlannerMilestone elem={milestone} />
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
