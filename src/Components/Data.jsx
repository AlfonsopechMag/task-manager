import {AiOutlinePieChart} from 'react-icons/ai'
import { AiFillDatabase } from "react-icons/ai";


export const SIDEBAR_DATA = [
  {
    id: 1,
    name: "Task Manager",
    path: "/",
    icon: <i className='navList'> <AiFillDatabase className="icon"/></i>,
  },
  {
    id: 2,
    name: "Graph",
    path: "/graph",
    icon: <i className='navList'> <AiOutlinePieChart className="icon"/></i>,
  },
];
