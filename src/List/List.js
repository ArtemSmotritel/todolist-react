import SectionHeader from "../SharedComponents/SectionHeader";
import EmptyBox from "../SharedComponents/EmptyBox";
import Task from "./Task/Task";
import "./List.css";
import { useState } from "react";
import { updateTaskOnServer, deleteTaskOnServer } from "../serverFunctions";

export default function List(params) {
  // const { list, title, setList } = params;
  const {data} = params;
  const [list, setList] = useState(data.tasks ?? []);
  const [title, setTitle] = useState(data.name ?? '');
  const [showDone, setShowDone] = useState(false);

  const toggleDoneTasks = (e) => {
    console.log('here');
    const showAllTasks = e.target.checked;
    setShowDone(showAllTasks);
  };

  const onTaskDelete = async (taskId) => {
    await deleteTaskOnServer(taskId);
    setList(list.filter((t) => t.id !== taskId));
  };

  const onTaskCheck = async (taskId, newDone) => {
    await updateTaskOnServer(taskId, { done: newDone });
    const task = list.find((t) => t.id === taskId);
    task.done = newDone;
    setList([...list]);
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
            className="list__empty"
            title="No tasks here. Surely you can add one"
          />
        )}
      </section>
    </section>
  );
}
