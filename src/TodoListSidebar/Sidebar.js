import { useState, useEffect } from "react";
import SectionHeader from "../SharedComponents/SectionHeader";
import ListItem from "./ListItem";
import "./Sidebar.css";
import { getLists } from "../serverFunctions";
import { NavLink } from "react-router-dom";

export default function Sidebar(params) {
  const [lists, setLists] = useState([]),
    [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    getLists().then((data) => {
      setLists(data.undone_tasks_by_list);
      setTaskCount(data.tasks_for_today);
    });
  }, []);

  return (
    <aside className="sidebar">
      <h1 className="sidebar__main-header">TODO list</h1>
      <NavLink className="sidebar__today" to={"/today"}>
        Tasks for today
        <span className="sidebar__task-count">({taskCount})</span>
      </NavLink>
      <SectionHeader title="Your lists" />
      <ul className="list-of-lists">
        {lists.map((l) => (
          <ListItem list={l} key={l.id} />
        ))}
      </ul>
    </aside>
  );
}
