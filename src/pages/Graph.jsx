import React from 'react';
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { insertArrayValues } from '../utils/global';
import "../styles/graph.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    loadTasksFromLocalStorage()
  },[])

  function loadTasksFromLocalStorage() {
    let toDo = 0;
    let inProgress = 0;
    let done = 0;
    let arrNumber = [];
    let loadedTasks = localStorage.getItem("tasks");
    let tasks = JSON.parse(loadedTasks);
  
    let arrTodo = [
      ...tasks.filter(({status}) => status === "To Do"),
    ];

    let arrInProgress = [
      ...tasks.filter(({status}) => status === "In Progress"),
    ];

    let arrDone = [
      ...tasks.filter(({status}) => status === "Done")
    ];

    toDo = arrTodo.length;
    inProgress = arrInProgress.length;
    done = arrDone.length;

    var result = insertArrayValues(arrNumber,0, toDo, inProgress, done);

    setTasks(result);
  
}
  const dataChart ={
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Task Graphycs',
        data: tasks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className='graphyc_container'>
      <Pie data={dataChart} />
    </div>
  )
}

export default Graph