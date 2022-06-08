import "./App.css";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <main>
        <List />
        <NewTaskForm />
      </main>
    </>
  );
}

export default App;
