import "./App.css";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <List />
      <NewTaskForm />
    </>
  );
}

export default App;
