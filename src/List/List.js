import { useState } from "react";
import "./List.css";
import Task from "./Task/Task";

export default function List(params) {
  const { list } = params;
  
  function onDelete(id) {
    let index = list.findIndex((t) => t.id === id);
    list.splice(index, 1);
  }

  function onCheck(id) {
    let task = list.find((t) => t.id === id);
    task.done = !task.done;
  }
  return (
    <section className="list">
      <h3 className="list__name">Undone tasks</h3>
      <section className="list__tasks">
        {list.map((t) => (
          <Task task={t} key={t.id} onDelete={onDelete} onCheck={onCheck} />
        ))}
      </section>
    </section>
  );
}
