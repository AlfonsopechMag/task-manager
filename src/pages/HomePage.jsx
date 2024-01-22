/*Dependecies */
import React from 'react'
import { useState, useEffect } from "react";
/*Components */
import StatusLine from "../Components/StatusLine";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
/*Styles */
import 'react-tabs/style/react-tabs.css';
import "../styles/home.css"

/*Others */
import {filterIds, sortedArray} from '../utils/global';
import { FaArrowTrendUp } from "react-icons/fa6";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillDatabase } from "react-icons/ai";


/**
 * @name HomePage
 * @description home page
 * @returns
 */
const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskFiltered, setTasksFiltered] = useState([]);
    const [filterIsActive, setFilterIsActive] = useState(false);

    useEffect(() => {
        loadTasksFromLocalStorage();
    }, []);

    /**
   * addEmptyTask function to add new task
   */
    function addEmptyTask(status) {  
        let newTaskId =  filterIds(tasks);
                    
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

   /**
   * addTask function to modify existing task
   */
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

    /**
   * deleteTask function to delete existing task
   */
    function deleteTask(taskId) {
        let filteredTasks = tasks.filter((task) => {
        return task.id !== taskId;
        });

        setTasks(filteredTasks);

        saveTasksToLocalStorage(filteredTasks);
    }

    /**
   * moveTask function to set new status for existing task
   */
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
      
        setTasks(newTaskList);
        saveTasksToLocalStorage(newTaskList);
    }

    /**
   * randomTask function to set random task into the task manager
   */
    function randomTask() {
      let taskRandom = [];
      
      for (let index = 1; index <= 50; index++) {      
        let newTaskId =  filterIds(tasks);
        let newTask = {
          id: newTaskId,
          title: "TaskRandom"+ index,
          description: "This task is generate for a function",
          urgency: "low",
          status: "To Do",
          isCollapsed: true,
          time: 500,
          timeSpent: "",
          untilTime: 0
        };
    
        taskRandom.push(newTask)
      }
      setTasks(taskRandom);
      saveTasksToLocalStorage(taskRandom);
    }

    /**
   * saveTasksToLocalStorage function to set all task into LocalStorage
   */
    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    /**
   * loadTasksFromLocalStorage function to load existing task
   */
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
    <div className='container-tabs'>
          <Tabs>
            <TabList>
              <Tab>To Do <AiFillDatabase /></Tab>
              <Tab>In Progress <FaArrowTrendUp /></Tab>
              <Tab>Done <AiFillCheckCircle /></Tab>
            </TabList>
              
            <TabPanel>
              <StatusLine
                  tasks={!filterIsActive ? tasks : taskFiltered}
                  addEmptyTask={addEmptyTask}
                  addTask={addTask}
                  deleteTask={deleteTask}
                  moveTask={moveTask}
                  status="To Do"
                  setFilterIsActive={setFilterIsActive}
                  setTasksFiltered={setTasksFiltered}
                  randomTask={randomTask}
              />
            </TabPanel>
            <TabPanel>
            <StatusLine
                tasks={tasks}
                addEmptyTask={addEmptyTask}
                addTask={addTask}
                deleteTask={deleteTask}
                moveTask={moveTask}
                status="In Progress"
              />
            </TabPanel>
            <TabPanel>
            <StatusLine
                    tasks={tasks}
                    addEmptyTask={addEmptyTask}
                    addTask={addTask}
                    deleteTask={deleteTask}
                    moveTask={moveTask}
                    status="Done"
                  />
            </TabPanel>
          </Tabs>
          </div>
        <section>                    
          
        </section>
      </main>
    </div>
  )
}

export default HomePage