import "./App.css";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";
import List from "./List/List";
import { useState } from "react";
import { addTaskOnServer } from "./serverFunctions";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const [listId, setListId] = useState(1);

  const onAddTask = async (task) => {
    const { id } = await addTaskOnServer(task, listId);
    task.list_id = listId;
    task.id = id;
    // setList([...list, task]);
  };

  return (
    <>
      <Sidebar onListIdChange={setListId} />
      <main>
        <Routes>
          <Route path="todo-list/">
            <Route path=":id" element={<List />}></Route>
          </Route>
          <Route path="today" element={<List />} />
        </Routes>
        <NewTaskForm onAddTask={onAddTask} />
      </main>
    </>
  );
}
