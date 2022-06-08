import React from "react";
import "./Task.css";
import deleteImg from "./trash-bin.png";

const task = {
  id: 1,
  name: "To eat in a restaurant lorem",
  description: "to eat something really tasty",
  done: true,
  due_date: new Date(),
  list_id: 1,
};

const isOverdue = (dueDateStringOrDate) => {
  const today = new Date();
  const dueDate = dueDateStringOrDate ? new Date(dueDateStringOrDate) : "";

  if (!dueDate || dueDate.setHours(23, 59, 59) >= today) {
    return "";
  }
  return " task__date_overdue";
};

const formatDate = (dueDateStringOrDate) => {
  const dueDate = dueDateStringOrDate ? new Date(dueDateStringOrDate) : "";

  let dateFormmated = dueDate
    ? ": " + Intl.DateTimeFormat("en-US").format(dueDate)
    : " is not set";

  return dateFormmated;
};

export default function Task(params) {
  const dueDateClass = "task__due-date" + isOverdue(task.due_date);
  return (
    <section className="task" id={task.id}>
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
          {task.name}
        </label>
      </div>
      {task.description ? (
        <p className="task__description">{task.description}</p>
      ) : (
        ""
      )}
      {task.due_date ? (
        <p className="task__date">
          Due date:{" "}
          <span className={dueDateClass}>{formatDate(task.due_date)}</span>
        </p>
      ) : (
        ""
      )}
    </section>
  );
}
