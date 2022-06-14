import "./App.css";
import TodoListPage from "./TodoListPage";
import Sidebar from "./TodoListSidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import TodayTaskPage from "./TodayTasksPage";

export default function App() {
  return (
    <>
      <Sidebar />
      <main>
        <Routes>
          <Route path="today" element={<TodayTaskPage/>} />
          <Route path="todo-list/:id" element={<TodoListPage />} />
        </Routes>
      </main>
    </>
  );
}
