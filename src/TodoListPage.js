import NewTaskForm from "./NewTaskForm/NewTaskForm";
import "./List/List.css";
import { addTaskOnServer, getListOrToday } from "./serverFunctions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "./List/List";

export default function TodoListPage() {
  const [data, setData] = useState({}),
    { id: listId } = useParams();

  const getData = async (listId) => {
    const data = await getListOrToday(listId);
    setData(data);
  };

  useEffect(() => {
    getData(listId);
  }, [listId]);

  const onAddTask = async (task) => {
    const { id } = await addTaskOnServer(task, listId);
    task.list_id = listId;
    task.id = id;
    const tasks = data.tasks;
    tasks.push(task);
    setData({ name: data.name, tasks: tasks });
  };

  return (
    <>
      <List data={data} />
      <NewTaskForm onAddTask={onAddTask} />
    </>
  );
}
