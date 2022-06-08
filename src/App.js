import "./App.css";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";
import { useState } from "react";

const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

const tasks = [
  {
    id: 1,
    name: "To eat in a restaurant",
    description: "to eat something really tasty",
    done: true,
    due_date: yesterday,
    list_id: 1,
  },
  {
    id: 6,
    name: "To run",
    description: "to run away from",
    done: false,
    due_date: today,
    list_id: 1,
  },
  {
    id: 2,
    name: "To walk",
    description:
      "to have a lonely long walk by the beach. Visit few friends, go shopping",
    done: false,
    list_id: 1,
  },
  {
    id: 3,
    name: "To do this task by nightfall",
    description:
      "to work hard and persistently. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum consectetur eveniet, temporibus quas doloribus at inventore ipsum alias nam velit exercitationem vel delectus fuga, voluptatibus libero sapiente soluta rem. ",
    done: false,
    due_date: yesterday,
    list_id: 2,
  },
  {
    id: 4,
    name: "Chill",
    description:
      "to chill. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum consectetur eveniet, temporibus quas doloribus at inventore ipsum alias nam velit exercitationem vel delectus fuga, voluptatibus libero sapiente soluta rem. ",
    done: false,
    due_date: yesterday,
    list_id: 2,
  },
  { id: 5, name: "To sleep", done: false, due_date: tomorrow, list_id: 1 },
];

function App() {
  const [listId, setListId] = useState(1);
  
  const onListChange = id => {
    setListId(id);
  }

  return (
    <>
      <Sidebar onListChange={onListChange}/>
      <main>
        <List list={tasks.filter((t) => t.list_id === listId)} />
        <NewTaskForm />
      </main>
    </>
  );
}

export default App;
