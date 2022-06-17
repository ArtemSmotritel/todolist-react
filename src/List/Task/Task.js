import { useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";
import { checkTask, deleteTask } from "../../store/tasks/reducer";
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

export default function Task({ task }) {
  const { id, done, description, name, due_date, list_id, list_name } = task;

  const dispatch = useDispatch();

  return (
    <section className={`task ${done && "task_done"}`} id={id}>
      <img
        onClick={() => dispatch(deleteTask(id))}
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
          onChange={() => dispatch(checkTask({ id, newDone: !done }))}
          checked={done}
        ></input>
        <label className="task__name" htmlFor="task-1">
          {name}
        </label>
      </div>
      {description && <p className="task__description">{description}</p>}
      {due_date && (
        <p className="task__date">
          Due date:{" "}
          <span className={"task__due-date" + isOverdue(due_date)}>
            {formatDate(due_date)}
          </span>
        </p>
      )}
      {list_name && (
        <NavLink className="task__list_name" to={`/todo-list/${list_id}`}>
          {list_name}
        </NavLink>
      )}
    </section>
  );
}
