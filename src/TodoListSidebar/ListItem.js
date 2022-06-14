import { NavLink } from "react-router-dom";
import "./ListOfLists.css";

export default function ListItem({ list }) {
  const { id, name, tasks_count } = list;
  return (
    <li className={"list-of-lists__item"} id={`list-${id}`}>
      <NavLink className="list-of-lists__link" to={`/todo-list/${id}`}>
        {name}
        <span className="list-of-lists__task-count">({tasks_count})</span>
      </NavLink>
    </li>
  );
}
