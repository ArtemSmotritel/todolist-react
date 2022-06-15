import NewTaskForm from "./NewTaskForm/NewTaskForm";
import SectionHeader from "./SharedComponents/SectionHeader";
import EmptyBox from "./SharedComponents/EmptyBox";
import Task from "./List/Task/Task";
import "./List/List.css";
import {
  updateTaskOnServer,
  deleteTaskOnServer,
  addTaskOnServer,
  getListOrToday,
} from "./serverFunctions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TodoListPage() {
  const [list, setList] = useState([]),
    [title, setTitle] = useState(""),
    [showDone, setShowDone] = useState(false),
    { id: listId } = useParams();

  const getData = async (listId) => {
    const data = await getListOrToday(listId);
    setList(data.tasks);
    setTitle(data.name);
  };

  useEffect(() => {
    getData(listId);
  }, [listId]);

  const toggleDoneTasks = (e) => {
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

  const onAddTask = async (task) => {
    const { id } = await addTaskOnServer(task, listId);
    task.list_id = listId;
    task.id = id;
    setList([task, ...list]);
  };

  return (
    <>      
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
      <NewTaskForm onAddTask={onAddTask} />
    </>
  );
}
