import "./NewTaskForm.css";
import React, { useState } from "react";

export default function Form(params) {
  const { onAddTask } = params,
    [task, setTask] = useState({});

  const resetForm = () => {
    setTask({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, dueDate } = task;
    onAddTask({ name, description, due_date: dueDate });
    resetForm();
  };

  const trackInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask((previousInputs) => ({ ...previousInputs, [name]: value }));
  };

  return (
    <form
      name="add-task"
      className="add-task-form"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className="add-task-form__container">
        <div className="add-task-form__name-container">
          <label htmlFor="task-name" className="add-task-form__name-label">
            Name
          </label>
          <input
            type="text"
            required
            id="task-name"
            className="add-task-form__name-field"
            placeholder="task name"
            name="name"
            value={task.name || ""}
            onChange={trackInput}
          />
        </div>
        <div className="add-task-form__date-container">
          <label
            htmlFor="task-due-date"
            className="add-task-form__due-date-label"
          >
            Due date
          </label>
          <input
            type="date"
            id="task-due-date"
            className="add-task-form__due-date-field"
            placeholder="due date"
            name="dueDate"
            value={task.dueDate || ""}
            onChange={trackInput}
          />
        </div>
      </div>

      <label
        htmlFor="task-description"
        className="add-task-form__description-label"
      >
        Description
      </label>
      <textarea
        id="task-description"
        className="add-task-form__description-field"
        placeholder="task description"
        name="description"
        value={task.description || ""}
        onChange={trackInput}
      ></textarea>

      <button type="submit" className="add-task-form__button">
        Add
      </button>
      <div className="add-task-form__lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </form>
  );
}
