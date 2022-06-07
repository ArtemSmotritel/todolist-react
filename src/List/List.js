import React from "react";
import "./List.css";
import Task from "./Task/Task";

export default function List(params) {
  return (    
      <section className="list">
        <h3 className="list__name">Undone tasks</h3>
        <Task />
      </section>    
  );
}
