import "./App.css";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";
import { useState, useEffect } from "react";
import {
  getLists,
  getListById,
  updateTaskOnServer,
  deleteTaskOnServer,
  addTaskOnServer,
  getTasksForToday
} from "./serverFunctions";

export default function App() {
  const [listId, setListId] = useState(1),
    [list, setList] = useState([]),
    [showDone, setShowDone] = useState(false),
    [title, setTitle] = useState("Undone tasks"),
    [lists, setLists] = useState([]);

  const updateCurrentList = async (listId) => {
    const newList = await getListById(listId);
    setList(newList);
  };

  useEffect(() => {
    updateCurrentList(listId);
  }, [listId]);

  useEffect(() => {
    getLists().then((lists) => setLists(lists));
  }, []);

  const onTodayTasks = async () => {    
    const tasks = await getTasksForToday();
    setList(tasks);
  }

  const onToggleDoneTasks = (newShowDone) => {
    const newTitle = newShowDone ? "All tasks" : "Undone tasks";
    setTitle(newTitle);
    setShowDone(newShowDone);
  };

  const onAddTask = async (task) => {
    const { id } = await addTaskOnServer(task, listId);
    task.list_id = listId;
    task.id = id;
    setList([...list, task]);    
  };

  const onTaskCheck = async (id, newDone) => {
    await updateTaskOnServer(id, { done: newDone });
  };

  const onTaskDelete = async (id) => {
    await deleteTaskOnServer(id);
    updateCurrentList(listId);
  };

  return (
    <>
      <Sidebar
        onListIdChange={setListId}
        onToggleDoneTasks={onToggleDoneTasks}
        onTodayTasks={onTodayTasks}
        listOfLists={lists}
      />
      <main>
        <List
          list={list}
          title={title}
          onTaskDelete={onTaskDelete}
          onTaskCheck={onTaskCheck}
          showDone={showDone}
        />
        <NewTaskForm onAddTask={onAddTask} />
      </main>
    </>
  );
}
