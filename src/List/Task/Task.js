import { useState } from "react";
import "./Task.css";
import deleteImg from "./trash-bin.png";

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
    : "";

  return dateFormmated;
};

export default function Task(params) {
  const { task, onDelete, onCheck } = params,
    [check, setCheck] = useState(task.done);

  let dueDateClass = "task__due-date" + isOverdue(task.due_date),
    taskClass = "task" + (check ? " task_done" : "");

  const handleDelete = (e) => {
    const taskElement = e.target.closest(".task");
    onDelete(+taskElement.id);
  };

  const handleCheck = (e) => {
    const newDone = e.target.checked;
    const taskId = e.target.closest(".task").id;
    setCheck(newDone);
    onCheck(+taskId);
  };

  return (
    <section className={taskClass} id={task.id}>
      <img
        onClick={handleDelete}
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
          onChange={handleCheck}
          checked={check}
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
