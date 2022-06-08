import removeImg from "./remove.png";
import "./NewTaskForm.css";
import React from "react";

export default function Form(params) {
  return (
    <form name="add-task" className="add-task-form" autoComplete="off">
      <img
        src={removeImg}
        alt="hide-form button"
        className="add-task-form__hide-form"
      />
      <div className="add-task-form__container">
        <div className="add-task-form__name-container">
          <label htmlFor="task-name" className="add-task-form__name-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            id="task-name"
            placeholder="task name"
            className="add-task-form__name-field"
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
            name="due_date"
            type="date"
            id="task-due-date"
            className="add-task-form__due-date-field"
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
        name="description"
        id="task-description"
        className="add-task-form__description-field"
        placeholder="task description"
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
