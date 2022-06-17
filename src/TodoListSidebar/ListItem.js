import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import "./ListOfLists.css";

export default function ListItem({ list }) {
  const { id, name } = list,
  tasksCount = useSelector(state => state.dashboard.openedTasks[id]); 
  
  return (
    <li className="list-of-lists__item" id={`list-${id}`}>
      <NavLink className="list-of-lists__link" to={`/todo-list/${id}`}>
        {name}
        <span className="list-of-lists__task-count">({tasksCount})</span>
      </NavLink>
    </li>
  );
}
