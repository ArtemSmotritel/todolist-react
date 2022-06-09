import React from "react";
import "./Sidebar.css";

export default function Sidebar(params) {
  const { onListIdChange } = params;
  
  const handleCheck = (e) => {
    console.log("changed");
  };

  const handleListChange = (e) => {
    const id = +e.target.id.split('-')[1];
    onListIdChange(id);
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar__main-header">TODO list</h1>
      <div className="sidebar__checkbox-container">
        <input
          className="sidebar__checkbox"
          type="checkbox"
          id="sidebar-toggle"
          onChange={handleCheck}
        ></input>
        <label className="sidebar__checkbox-label" htmlFor="sidebar-toggle">
          Show all tasks
        </label>
      </div>
      <h2 className="sidebar__section-header">Your lists</h2>
      <ul className="list-of-lists">
        <li className="list-of-lists__item" id="list-1" onClick={handleListChange}>
          Easy tasks
        </li>
        <li className="list-of-lists__item" id="list-2" onClick={handleListChange}>
          Hard tasks
        </li>
      </ul>
    </aside>
  );
}
