import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PlannerMilestone from "./PlannerMilestone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { editLongTask, setLongTask, setLongTodos } from "../../redux/slices/longSlices";
import { toast } from "react-toastify";



const PlannerPage = () => {
  const location = useLocation();
  const { ltask, decoded, todoId, todoname } = location.state || {};

  const navigate = useNavigate();

  

  const currLongTodo = useSelector((state) => state.long.longTodos.find(todo => todo.id ==  todoId))
  

  // console.log(currLongTodo,todoId);
  // console.warn({ ltask, decoded, todoId, todoname })


  //react quill
  const [valuePlanner, setValue] = useState("");


  // const [taskIduse, setTaskIduse] = useState(null);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const dispatch = useDispatch();

  /*
  const handleUpdateTask = () => {
    console.log("aaa", ltask.id)
    dispatch(
      setLongTask({
        todoId: todoId,
        taskId: ltask.id,
        updatedTask: {
          plantext: ltask.plantext,
          deadline: ltask.deadline, 
          impurg: ltask.impurg,
        },
      })
    );

    
  };
  */
  
  /*
  
  useEffect(() => {
    setValue(ltask.plantext)
  }, [ltask?.plantext,location.state,dispatch]);
  
*/
  
  useEffect(() => {
    // setLongTodos({todoId,})
    setValue(ltask.plantext)
  }, []);

  
  



  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    // ["link", "image", "formula"],
    ["link", "formula"]

    // [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = Math.floor(new Date(ltask.deadline) - new Date());
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
  }, [ltask.deadline]);



  const handlePlannerSave = async () => {
    // console.log(todoId, "taskid", ltask.id, valuePlanner);
    try {
      await axios
        .put("https://toolserver.vercel.app/api/long/editlongtask", {
          userId: decoded?.userID,
          todoId,
          taskId: ltask.id,
          plannertitle: ltask.plannertitle,
          deadline: ltask.deadline,
          impurg: ltask.impurg,
          milestone: ltask.milestone,
          plantext: valuePlanner,
        })
        .then((res) => {
          // console.log("Task edited successfully:", res.data.task);
          // console.log(res?.data.task.plantext);
          ltask.id = res.data.task._id
          ltask.plantext = res?.data.task.plantext
          
          // setValue(res?.data.task.plantext)

          // console.log("planner after api ",ltask.plantext);
          setValue(ltask.plantext)
          // handleUpdateTask()

          dispatch(
            editLongTask({
              todoId,
              taskId: res.data.task._id,
              plantext: res?.data.task.plantext,
            })
          );
          // toast.success('saved')
          navigate(-1)
          
          
        })
        .catch((err) => {
          console.log(err)
          toast.error('jii')
        }
        
      );
    } catch (error) {
      console.log("Error editing long task:");
    }
  };


  return (
    <div className=" h-screen w-full font-cusT ">
      <div className="details_top bg-[#121212]  h-[20%] w-full">
        <div className="top_header">
          <div className="text-sm breadcrumbs text-white ml-5">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>{todoname}</li>
              <li>{ltask.plannertitle}</li>
            </ul>
          </div>
        </div>
        <div className="top_deadline w-full h-[60%] flex justify-evenly items-center ">
          {/* --clock-- */}
          <div className="grid grid-flow-col gap-5 text-center auto-cols-max w-min ">
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
          <h1 className="dynamic-title font-semibold text-white w-[50%] flex justify-end ">
            {ltask.plannertitle}
          </h1>
        </div>
      </div>
      <div className="details_bottom  flex flex-col md:flex-row   bg-[#181818]">
      
        <div className="details_left bg-[#181818]  w-full h-[80vh]">
          <h1
            className={`heading font-semibold text-2xl  w-max p-2 m-2 rounded-xl shadow-lg ${
              ltask.impurg == "imp & urg"
                ? "bg-red-500"
                : ltask.impurg == "imp & non urg"
                ? "bg-yellow-500"
                : ltask.impurg == "non imp & urg"
                ? "bg-orange-500"
                : ltask.impurg == "non imp & non urg"
                ? "bg-green-500"
                : "bg-gray-500"
            }`}
          >
            {ltask.impurg == "imp & urg"
              ? "Important and urgent"
              : ltask.impurg == "imp & non urg"
              ? "important but non urgent"
              : ltask.impurg == "non imp & urg"
              ? "non important & urgent"
              : ltask.impurg == "non imp & non urg"
              ? "non imporant & non urgent"
              : "bg-gray-500"}
          </h1>

          <ReactQuill
            theme="snow"
            value={valuePlanner}
            onChange={setValue}
            modules={module}
            className="h-[80%] mx-5 px-5 text-white"
            placeholder="write your documentation here..."
          />


          <div className="btn_wrapper absolute right-16 bottom-10 bg-whit">
            <button className="btn btn-accent m-3  btn-disabled"  >
              edit
            </button>
            <button className="btn btn-primary m-3" onClick={handlePlannerSave}>
              Save
            </button>
          </div>
        </div>
{/*         
        <div className="details_right md:w-1/3 w-full h-[80vh] bg-[#181818]">
           <PlannerMilestone elem={milestone} /> 
        </div> */}
      </div>
    </div>
  );
};

export default PlannerPage;
