import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Task.css";
import deleteImg from "./trash-bin.png";

const isOverdue = (dueDateStringOrDate) => {
  const today = new Date();
  const dueDate = dueDateStringOrDate && new Date(dueDateStringOrDate);

  if (!dueDate || dueDate.setHours(23, 59, 59) >= today) return "";
  return " task__date_overdue";
};

const formatDate = (dueDateStringOrDate) => {
  if (!dueDateStringOrDate) return "";
  return Intl.DateTimeFormat("en-US").format(new Date(dueDateStringOrDate));
};

export default function Task(params) {
  const { task, onDelete, onCheck } = params,
    [check, setCheck] = useState(task.done);

  const handleDelete = (e) => {
    const taskElement = e.target.closest(".task");
    onDelete(+taskElement.id);
  };

  const handleCheck = (e) => {
    const newDone = e.target.checked;
    const taskId = e.target.closest(".task").id;
    setCheck(newDone);
    onCheck(+taskId, newDone);
  };

  return (
    <section className={`task ${check && "task_done"}`} id={task.id}>
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
      {task.description && (
        <p className="task__description">{task.description}</p>
      )}
      {task.due_date && (
        <p className="task__date">
          Due date:
          <span className={"task__due-date" + isOverdue(task.due_date)}>
            {formatDate(task.due_date)}
          </span>
        </p>
      )}
      {task.list_name && (
        <NavLink className="task__list_name" to={`/todo-list/${task.list_id}`}>
          {task.list_name}
        </NavLink>
      )}
    </section>
  );
}
