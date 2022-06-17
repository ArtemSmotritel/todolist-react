import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { getTasks } from "../store/tasks/reducer";

import SectionHeader from "../SharedComponents/SectionHeader";
import EmptyBox from "../SharedComponents/EmptyBox";
import Task from "./Task/Task";
import "./List.css";

export default function List() {
  const [showDone, setShowDone] = useState(false),
    { id: listId } = useParams(),
    dispatch = useDispatch();

  const list = useSelector((state) => state.list.tasks);
  const title = useSelector((state) => state.list.name);

  useEffect(() => {
    dispatch(getTasks(listId));
  }, [listId, dispatch]);

  const toggleDoneTasks = (e) => {
    const showAllTasks = e.target.checked;
    setShowDone(showAllTasks);
  };

  return (
    <section className={`list ${showDone && "list_show-done"}`}>
      <SectionHeader title={title} />
      <div className="list__checkbox-container">
        <input
          className="list__checkbox"
          type="checkbox"
          id="list-toggle"
          onChange={toggleDoneTasks}
        ></input>
        <label className="list__checkbox-label" htmlFor="list-toggle">
          Show all tasks
        </label>
      </div>
      <section className="list__tasks">
        {list && list.length ? (
          list.map((t) => <Task task={t} key={t.id} />)
        ) : (
          <EmptyBox
            className="list__empty"
            title="No tasks here. Surely you can add one"
          />
        )}
      </section>
    </section>
  );
}
