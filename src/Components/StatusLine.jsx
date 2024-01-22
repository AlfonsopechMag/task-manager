/*Styles */
import "../styles/statusLine.css";

/*Components */
import Task from "./Task";

export default function StatusLine(props) {
  const { status, tasks, addTask, deleteTask, addEmptyTask, moveTask, setFilterIsActive, setTasksFiltered, randomTask } = props;

  let taskList, tasksForStatus;


  /**
   * handleAddEmpty function to add empty status for a new task
   */
  function handleAddEmpty() {
    addEmptyTask(status);
  }

  /**
   * filterByStatus function to filter status by status and set data into array of tasks
   */
  function filterByStatus(urgencyFilter){
    if (urgencyFilter === "All") {
      setFilterIsActive(false)
      setTasksFiltered([])      
    }else{
      setFilterIsActive(true)

      let loadedTasks = localStorage.getItem("tasks");
      let tasks = JSON.parse(loadedTasks);
      let newArr = tasks?.filter(({urgency, status}) => urgency === urgencyFilter && status === "To Do");
      setTasksFiltered(newArr)
    }    
  }

  if (tasks) {
    tasksForStatus = tasks.filter((task) => {
      return task.status === status;
    });
  }

  if (tasksForStatus) {
    taskList = tasksForStatus.map((task) => {
      return (
        <Task
          addTask={(task) => addTask(task)}
          deleteTask={(id) => deleteTask(id)}
          moveTask={(id, status, keyName) => moveTask(id, status, keyName)}
          key={task.id}
          task={task}
          status={status}
        />
      );
    });
  }

  return (
    <div className="statusLine">                  
      {status === "To Do" && 
        <div className="container_filter">
          <div className="container_select">
            <select name="status" id="status" className="filter_status" onChange={(e)=>filterByStatus(e.target.value)}>
              <option value="All">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div className="container_add">
            <button onClick={handleAddEmpty} className="button addTask">
              +
            </button>

            <button onClick={randomTask} className="button randomTask">
              random tasks
            </button>
          </div>      
              
        </div>        
      }
          
       
      
      {taskList}
    </div>
  );
}
