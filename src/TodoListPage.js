import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import { addTaskOnServer, getListOrToday } from "./serverFunctions";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function TodoListPage() {
  const [data, setData] = useState({}),
    [list, setList] = useState([]);
  const { id: listId } = useParams();

  const getData = async (listId) => {
    const data = await getListOrToday(listId);
    setData(data);
    setList(data.tasks);
  };

  useEffect(() => {
    getData(listId);
  }, [listId]);

  const onAddTask = async (task) => {
    const { id } = await addTaskOnServer(task, listId);
    task.list_id = listId;
    task.id = id;
    setList([task, ...list]);
  };

  return (
    <>
      <List list={list} title={data.name} setList={setList}/>
      <NewTaskForm onAddTask={onAddTask} />
    </>
  );
}
