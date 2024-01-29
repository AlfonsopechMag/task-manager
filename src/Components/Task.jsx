import "../styles/task.css";
import { useEffect, useState } from "react";
import Countdown from "./CountDown/CountDown"
import { secondsToString, urgencyValue } from "../utils/global";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiFillSave } from "react-icons/ai";

import swal from 'sweetalert';

/**
 * @name Task
 * @description component for task cards
 * @param {props} data information to render all task
 * @returns
 */
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
  
  /**
   * Untiltime function to set time for the task and urgency level
   */
  function setUrgencyAndTime(event) {
    setUrgencyLevel(event.target.attributes.urgency.value);
    setTime(event.target.attributes.timer.value)
  }

  /**
   * Untiltime function to set until time when user start the timer
   */
  function Untiltime(event){
    setTimeLeft(event)
  }

  /**
   * handleHoursCustom function to set hours when user select custom time
   */
  function handleHoursCustom (e){
    if (e > 0) {
      let convertHours = e*60;
      let convertSeconds = convertHours *60;

      setCustomHours(convertSeconds)      
    }else{
      setCustomHours(0)
    }
    
  }

  /**
   * handleMinutesCustom function to set minutes when user select custom time
   */
  function handleMinutesCustom (e){
    if(e > 0 && e < 59){        
        let convertSeconds = e *60;
        setCustomMinutes(convertSeconds)
    }else{
      setCustomMinutes(0)
    }
  }

  function validateData(title, desc){
    if (title === "") {
      swal("The name can't be empty");
      return false;
    }else if(desc === ""){
      swal("The description can't be empty");
      return false;
    }else{
      return true
    }
  }

  /**
   * handleSubmit function to set data or remove task
   */
  function handleSubmit(event) {
    event.preventDefault();
    let validData = validateData(event.target.elements.title.value, event.target.elements.description.value);
    let timerUser = 0;
    let customUrgency = "";

    if (customTime) {      
        timerUser = customHours + customMinutes;
        if (timerUser > 7200) {
          swal("The task must be less than 2 hours");
          validData = false
        }else if (timerUser <= 0) {
          validData = false
          swal("Task time cannot be equal to zero, please type a valid time");
        }else{       
          customUrgency = urgencyValue(timerUser)
          validData = true;
          setTime(timerUser);
        }        
    }else{
      if (time === "") {
        validData = false
        swal("Task time cannot be equal to zero");
      }

    }
    if (formAction === "save" && validData) {
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

  /**
   * handleMoveLeft changes status of the task according to previous status
   */
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
   * handleMoveRight changes status of the task according to previous status
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
   * useEffect to set status Done when a timer reaches zero
   */
  useEffect(()=>{
    if (timeFinished) {
      moveTask(task.id, "Done", "status");
    }
  }, [timeFinished]);

  /**
   * useEffect to set until time when the user start the timer
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
          <textarea
            rows="2"
            className="description input"
            name="description"
            placeholder="Enter Description"
            disabled={collapsed}
            defaultValue={task.description}
          />
        </div>     
        
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
            </>
            : 
            null
         }
         
        {!customTime && !collapsed ? 
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
       
        <div>
          {status === "Done" ? null : (
            <button
              onClick={() => {
                  setFormAction("save");
              }}
              className="button btn_edit"
            >
              {collapsed ? (<>Edit<AiFillEdit className="icon_edit"/></>) : (<>Save<AiFillSave className="icon_save"/></>)}
            </button>
          )}
            
            {collapsed && (
            <button
                onClick={() => {
                setFormAction("delete");
                }}
                className="button delete"
            >
                Delete<AiFillDelete className="icon_delete"/>
            </button>
            )}
        </div>                
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
