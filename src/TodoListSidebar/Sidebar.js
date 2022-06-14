import { useState, useEffect } from "react";
import SectionHeader from "../SharedComponents/SectionHeader";
import ListItem from "./ListItem";
import "./Sidebar.css";
import { getLists } from "../serverFunctions";
import { NavLink } from "react-router-dom";

export default function Sidebar(params) {
  const { onListIdChange, onTodayTasks } = params,
    [lists, setLists] = useState([]);

  useEffect(() => {
    getLists().then((data) => setLists(data.undone_tasks_by_list));
  }, []);

  const handleListChange = (e) => {
    if (e.target.id) {
      const id = +e.target.id.split("-")[1];
      onListIdChange(id);
    }
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar__main-header">TODO list</h1>
      <NavLink className="sidebar__today" to={"/today"}>
        Tasks for today
      </NavLink>      
      <SectionHeader title={"Your lists"} />
      <ul className="list-of-lists" onClick={handleListChange}>
        {lists.map((l) => (
          <ListItem list={l} key={l.id} />
        ))}
      </ul>
    </aside>
  );
}
