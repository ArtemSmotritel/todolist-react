import SectionHeader from "../SharedComponents/SectionHeader";
import EmptyBox from "../SharedComponents/EmptyBox";
import Task from "./Task/Task";
import "./List.css";
import { useState, useEffect } from "react";
import {
  getListById,
  updateTaskOnServer,
  deleteTaskOnServer,
} from "../serverFunctions";

export default function List(params) {
  const { listId } = params;
  const [list, setList] = useState([]),
    [showDone, setShowDone] = useState(false),
    [title, setTitle] = useState("Undone tasks");

  const updateCurrentList = async (listId) => {
    const newList = await getListById(listId);
    setList(newList);
  };

  useEffect(() => {
    updateCurrentList(listId);
  }, [listId]);

  const onShowAllTasks = (e) => {
    const showAllTasks = e.target.checked;
    const newTitle = showAllTasks ? "All tasks" : "Undone tasks";
    setTitle(newTitle);
    setShowDone(showAllTasks);
  };

  const onTaskDelete = async (id) => {
    await deleteTaskOnServer(id);
    const index = list.findIndex((t) => t.id === id);
    list.splice(index, 1);
    setList([...list]);
  };

  const onTaskCheck = async (id, newDone) => {
    await updateTaskOnServer(id, { done: newDone });
  };

  return (
    <section className={`list ${showDone && "list_show-done"}`}>
      <SectionHeader title={title} />
      <div className="list__checkbox-container">
        <input
          className="list__checkbox"
          type="checkbox"
          id="list-toggle"
          onChange={onShowAllTasks}
        ></input>
        <label className="list__checkbox-label" htmlFor="list-toggle">
          Show all tasks
        </label>
      </div>
      <section className="list__tasks">
        {list.length ? (
          list.map((t) => (
            <Task
              task={t}
              key={t.id}
              onDelete={onTaskDelete}
              onCheck={onTaskCheck}
            />
          ))
        ) : (
          <EmptyBox
            className={"list__empty"}
            title={"No tasks here. Surely you can add one"}
          />
        )}
      </section>
    </section>
  );
}
