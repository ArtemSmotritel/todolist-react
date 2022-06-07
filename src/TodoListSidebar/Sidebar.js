import React from "react";
import "./Sidebar.css";

export default function Sidebar(params) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar__main-header">TODO list</h1>
      <div className="sidebar__checkbox-container">
        <input
          className="sidebar__checkbox"
          type="checkbox"
          id="sidebar-toggle"
        ></input>
        <label className="sidebar__checkbox-label" htmlFor="sidebar-toggle">
          Show all tasks
        </label>
      </div>
      <h2 className="sidebar__section-header">Your lists</h2>
      <ul className="list-of-lists">
        <li className="list-of-lists__item">Easy tasks</li>
        <li className="list-of-lists__item">Hard tasks</li>
      </ul>
    </aside>
  );
}
