import React from "react";
import "./Task.css";
import deleteImg from "./trash-bin.png";

export default function Task(params) {
  return (
    <section className="task" id="1">
      <img
        src={deleteImg}
        alt="a trash can to delete the task"
        className="task__delete"
      />
      <div className="task__status">
        <input
          type="checkbox"
          name="done"
          className="task__checkbox"
          id="task-1"
        ></input>
        <label className="task__name" htmlFor="task-1">
          To break
        </label>
      </div>
      <p className="task__date">
        Due date: <span className="task__due-date">6/9/22</span>
      </p>
      <p className="task__description">I want to break free</p>
    </section>
  );
}
