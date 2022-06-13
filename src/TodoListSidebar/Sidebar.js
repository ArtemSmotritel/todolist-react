import { useState, useEffect } from "react";
import SectionHeader from "../SharedComponents/SectionHeader";
import ListItem from "./ListItem";
import "./Sidebar.css";
import { getLists } from "../serverFunctions";

export default function Sidebar(params) {
  const { onListIdChange, onTodayTasks } = params;
  const [highlightedList, setHighlightedList] = useState(1),
    [lists, setLists] = useState([]);

  useEffect(() => {
    getLists().then((lists) => setLists(lists));
  }, []);

  const handleListChange = (e) => {
    if (e.target.id) {
      const id = +e.target.id.split("-")[1];
      setHighlightedList(id);
      onListIdChange(id);
    }
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar__main-header">TODO list</h1>
      <span className="sidebar__today" onClick={onTodayTasks}>
        Tasks for today
      </span>
      <SectionHeader title={"Your lists"} />
      <ul className="list-of-lists" onClick={handleListChange}>
        {lists.map((l) => (
          <ListItem
            name={l.name}
            id={l.id}
            key={l.id}
            highlighted={highlightedList}
          />
        ))}
      </ul>
    </aside>
  );
}
