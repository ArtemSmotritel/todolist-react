import "./App.css";
import TodoListPage from "./TodoListPage";
import Sidebar from "./TodoListSidebar/Sidebar";
import List from "./List/List";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route path="today" element={<List />} />
          <Route path="todo-list/:id" element={<TodoListPage />} />
        </Routes>
      </main>
    </>
  );
}
