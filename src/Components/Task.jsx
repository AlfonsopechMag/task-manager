import "../styles/task.css";
import { useEffect, useState } from "react";
import Countdown from "./CountDown/CountDown"
import { secondsToString } from "../utils/global";

export default function Task(props) {
  const { addTask, deleteTask, moveTask, task, status } = props;
  const [urgencyLevel, setUrgencyLevel] = useState(task.urgency);
  const [time, setTime] = useState(task.time);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent)
  const [timeLeft, setTimeLeft] = useState(task.untilTime);
  const [timeFinished, setTimeFinished] = useState(false)
  const [collapsed, setCollapsed] = useState(task.isCollapsed);
  const [customTime, setCustomTime] = useState(false);
  const [customHours, setCustomHours] = useState(0)
  const [customMinutes, setCustomMinutes] = useState(0)
  const [formAction, setFormAction] = useState("");
  const [message, setMessage] = useState("");

  
  function setUrgencyAndTime(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
    setTime(event.target.attributes.timer.value)
  }

  function Untiltime(event){
    setTimeLeft(event)
  }

  function handleHoursCustom (e){
    console.log(e);
      let convertHours = e*60;
      console.log("convert==>",convertHours);
      let convertSeconds = convertHours *60;
      console.log("convertSeconds==>",convertSeconds);
      setCustomHours(convertSeconds)
    
  }

  function handleMinutesCustom (e){
    if(e > 0 && e < 59){        
        let convertSeconds = e *60;
        setCustomMinutes(convertSeconds)
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let timerUser = 0;
    let customUrgency = "";
    if (customTime) {        
        timerUser = customHours + customMinutes;

        if (timerUser >= 7200) {
          setMessage("the task must be less than 2 hours")
        }else{
          if(customTimer <= 1800){
            customUrgency = "low";
          }else if(customTimer > 1800 && customTimer <=  2700){            
              customUrgency = "medium";
          }else{
            customUrgency = "high";
          }
          setTime(customTimer)
        }        
    }
    
    if (formAction === "save" && message != "") {
      if (collapsed) {
        setCollapsed(false);
      } else {
        let newTask = {
          id: task.id,
          title: event.target.elements.title.value,
          description: event.target.elements.description.value,
          urgency: customTime ? customUrgency :urgencyLevel,
          status: task.status,
          isCollapsed: true,
          time: customTime ? timerUser :time,
          timeSpent: "",
          untilTime: timeLeft
        };

        addTask(newTask);
        setCollapsed(true);
      }
    }

    if (formAction === "delete") {
      deleteTask(task.id);
    }
  }

  function handleMoveLeft() {
    let newStatus = "";

    if (task.status === "In Progress") {
      newStatus = "To Do";
    } else if (task.status === "Done") {
      newStatus = "In Progress";
    }

    if (newStatus !== "") {
      moveTask(task.id, newStatus, "status");
    }
  }

  /**
   * handleMoveRight Click to redirect orders page
   */
  async function handleMoveRight() {
    let newStatus = "";
    

    if (task.status === "To Do") {
      newStatus = "In Progress";
    } else if (task.status === "In Progress") {
      let totalTime = parseInt(task.time) - parseInt(task.untilTime);
      let convertedSeconds = secondsToString(totalTime)
      setTimeSpent(convertedSeconds)
      newStatus = "Done";
    }

    if (newStatus !== "") {
      setTimeout(() => {
        moveTask(task.id, newStatus, "status");  
      }, 1000);      
    }
  }

  /**
   * useEffect to dispatch the request for financial products (select type products)
   */
  useEffect(()=>{
    if (timeFinished) {
      moveTask(task.id, "Done", "status");
    }
  }, [timeFinished]);

  /**
   * useEffect to dispatch the request for financial products (select type products)
   */
  useEffect(()=>{

    if (timeLeft > 0 || timeSpent != "") {
      moveTask(task.id, timeLeft, "untilTime")
      if (timeSpent != "") {
        moveTask(task.id, timeSpent, "timeSpent")
      }  
    }
    
  }, [timeLeft, timeSpent]);

  return (
    <div className={`task ${collapsed ? "collapsedTask" : ""} ${status != "To Do" && "task_padding"}`}>
        <div>
            {status === "In Progress"  ? (
                <button onClick={handleMoveLeft} className="button moveTask">
                    Back
                </button>
            ) : null}
       </div>
      
      <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : ""}>
        <div className="name-task">
            <input
            type="text"
            className="title input"
            name="title"
            placeholder="Enter Title"
            disabled={collapsed}
            defaultValue={task.title}
            />   
        </div>     
        <textarea
          rows="2"
          className="description input"
          name="description"
          placeholder="Enter Description"
          defaultValue={task.description}
        />
         {!collapsed && customTime ? 
         <>
            <div className="custom-time">
                <input
                type="number"
                className="hour input"
                name="hours"
                placeholder="Hour"
                min={0}
                max={2}
                onChange={(e)=>{handleHoursCustom(e.target.value)}}
                maxLength = {1}
                disabled={collapsed}
                />
                <input
                type="number"
                className="seconds input"
                name="minutes"
                placeholder="Minutes"
                min={0}
                max={59}
                onChange={(e)=>{handleMinutesCustom(e.target.value)}}
                maxLength = {1}
                disabled={collapsed}
                />
                <div className="container-back-time">
                    <button
                        onClick={() => {
                        setCustomTime(false);
                        }}
                        className="button delete"
                    >
                        X
                    </button>
                </div>
                <br/>
                
                
            </div>
            {message != "" && (<div>
              <span className="">{message}</span>
            </div>)}
            
            </>
            : 
            null
         }
         
        {!customTime ? 
         <div className={`urgencyLabels ${collapsed && "container_urgency"}`}>
         <label className={`low ${urgencyLevel === "low" ? "selected" : ""}`}>
           <input
             urgency ="low"
             timer ="1800"
             onChange={setUrgencyAndTime}
             type="radio"
             name="urgency"
           />
           {collapsed ? "Low" : "30 Min"}
         </label>
         <label
           className={`medium ${urgencyLevel === "medium" ? "selected" : ""}`}
         >
           <input
             urgency="medium"
             timer="2700"
             onChange={setUrgencyAndTime}
             type="radio"
             name="urgency"
           />
            {collapsed ? "Medium" : "45 Min"}
         </label>
         <label
           className={`high ${urgencyLevel === "high" ? "selected" : ""}`}
         >
           <input
             urgency="high"
             timer="3600"
             onChange={setUrgencyAndTime}
             type="radio"
             name="urgency"
           />
            {collapsed ? "High" : "1 Hr"}
         </label>
         <label
           className={`custom`}
         >
           <input
             urgency="3600"
             onChange={()=>{setCustomTime(true)}}
             type="radio"
             name="urgency"
           />
           Custom Time
         </label>
       </div> : null}
       
        <div>
          {status === "Done" ? null : (
            <button
              onClick={() => {
                  setFormAction("save");
              }}
              className="button"
            >
              {collapsed ? "Edit" : "Save"}
            </button>
          )}
            
            {collapsed && (
            <button
                onClick={() => {
                setFormAction("delete");
                }}
                className="button delete"
            >
                X
            </button>
            )}
        </div>

        {!collapsed ? null : 
        <div>
            <Countdown
              status={status} 
              initialTime={time} 
              timeLeft={Untiltime} 
              timeFinished={setTimeFinished}
              untilTime={timeLeft}
              timeSpent={timeSpent}
            />
        </div>
        
        }        
      </form>
      <div>
        { status === "Done" ? null : !collapsed ? null : 
        ( <button onClick={handleMoveRight} className="button moveTask">
              {status === "In Progress" ? "Finish" : "Start"}
          </button>
        )}
      </div>
      
    </div>
  );
}
