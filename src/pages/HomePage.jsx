import React from 'react'
import { useState, useEffect } from "react";
import StatusLine from "../Components/StatusLine";
import {sortedArray} from '../utils/global'
import "../styles/home.css"

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskFiltered, setTasksFiltered] = useState([]);
    const [filterIsActive, setFilterIsActive] = useState(false);

    useEffect(() => {
        loadTasksFromLocalStorage();
    }, []);

    function addEmptyTask(status) {  
        let newTaskId = 1;

        
        const ids = tasks.map(object => {
          return object.id;
        });
        
        if (ids.length > 0) {
          const max = Math.max(...ids);
          newTaskId = max + 1;  
        }
                    
        setTasks((tasks) => [
        ...tasks,
        {
            id: newTaskId,
            title: "",
            description: "",
            urgency: "",
            status: status,
            time: "",
            timeSpent: "",
            untilTime:0,
        },
        ]);
    }

    function addTask(taskToAdd) {        
      
      let filteredTasks = tasks.filter((task) => {
        return task.id !== taskToAdd.id;
        });

        if (filteredTasks != "" || filteredTasks != undefined) {
          let newTaskList = [...filteredTasks, taskToAdd];        
          let taskSort = sortedArray(newTaskList)
        
          setTasks(taskSort);
          saveTasksToLocalStorage(taskSort);
        }  
        
    }

    function deleteTask(taskId) {
        let filteredTasks = tasks.filter((task) => {
        return task.id !== taskId;
        });

        setTasks(filteredTasks);

        saveTasksToLocalStorage(filteredTasks);
    }

    function moveTask(id, newStatus, keyName) {
      let task = tasks.filter((task) => {
        return task.id === id;
        })[0];

        let filteredTasks = tasks.filter((task) => {
        return task.id !== id;
        });        

        if (keyName === "untilTime") {
          task.untilTime = newStatus
        }else if (keyName === "timeSpent"){
          task.timeSpent = newStatus;
        }else{
          task.status = newStatus
        }
        

        let newTaskList = [...filteredTasks, task];

        setTasks(newTaskList);

        saveTasksToLocalStorage(newTaskList);
    }

    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        let loadedTasks = localStorage.getItem("tasks");
        if (loadedTasks != null) {
          let tasks = JSON.parse(loadedTasks);
          let taskSort = sortedArray(tasks);
        
          if (tasks) {
            setTasks(taskSort);
          }  
        }
        
    }

  return (
    <div>
      <h1>Task Management</h1>
      <main>
        <section>
          <StatusLine
            tasks={!filterIsActive ? tasks : taskFiltered}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="To Do"
            setFilterIsActive={setFilterIsActive}
            setTasksFiltered={setTasksFiltered}
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="In Progress"
          />
          <StatusLine
            tasks={tasks}
            addEmptyTask={addEmptyTask}
            addTask={addTask}
            deleteTask={deleteTask}
            moveTask={moveTask}
            status="Done"
          />
        </section>
      </main>
    </div>
  )
}

export default HomePage