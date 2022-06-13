import "./App.css";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";
import { useState, useEffect } from "react";
import { getLists, addTaskOnServer, getTasksForToday } from "./serverFunctions";
import { Outlet } from "react-router-dom";

export default function App() {
  const [listId, setListId] = useState(1),
    [lists, setLists] = useState([]);

  useEffect(() => {
    getLists().then((lists) => setLists(lists));
  }, []);

  const onTodayTasks = async () => {
    const tasks = await getTasksForToday();
    // setList(tasks);
  };

  const onAddTask = async (task) => {
    const { id } = await addTaskOnServer(task, listId);
    task.list_id = listId;
    task.id = id;
    // setList([...list, task]);
  };

  return (
    <>
      <Sidebar
        onListIdChange={setListId}        
        onTodayTasks={onTodayTasks}
        listOfLists={lists}
      />
      <main>
        <List listId={listId} />
        <Outlet />
        <NewTaskForm onAddTask={onAddTask} />
      </main>
    </>
  );
}
