import "./App.css";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const urlTaskId = (id) => `/tasks/${id}`;
const urlListId = (id) => `/lists/${id}/tasks?all=true`;

async function makeRequest(url, method = "get", data) {
  const reqConfig = {
    method,
    baseURL: "http://localhost:3001",
    url,
  };
  if (data && method !== "get") reqConfig.data = data;

  const response = await axios(reqConfig);
  return response;
}

async function getLists() {
  const { data } = await makeRequest("/dashboard");
  return data.undone_tasks_by_list;
}

async function getListById(id) {
  const { data } = await makeRequest(urlListId(id));
  return data;
}

async function updateTaskOnServer(id, updatedFields) {
  await makeRequest(urlTaskId(id), "patch", updatedFields);
}

async function deleteTaskOnServer(id) {
  await makeRequest(urlTaskId(id), "delete");
}

async function addTaskOnServer(task, listId) {
  const { data } = await makeRequest(urlListId(listId), "post", task);
  return data;
}

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

  const onToggleDoneTasks = (newShowDone) => {
    const newTitle = newShowDone ? "All tasks" : "Undone tasks";
    setTitle(newTitle);
    setShowDone(newShowDone);
  };

  const onAddTask = async (task) => {
    await addTaskOnServer(task, listId);
    updateCurrentList(listId);
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
