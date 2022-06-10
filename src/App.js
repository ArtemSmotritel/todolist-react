import "./App.css";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import Sidebar from "./TodoListSidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

async function getListById(id) {
  const response = await axios(`http://localhost:3001/lists/${id}/tasks?all=true`);
  return response.data;
}

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
  const [listId, setListId] = useState(1),
    [list, setList] = useState([]),
    [showDone, setShowDone] = useState(false),
    [title, setTitle] = useState("Undone tasks");
    
    useEffect(() => {
      getListById(1)
        .then(list => setList(list));
    }, []);

    const onListIdChange = async (id) => {
      setListId(id);
      const listToDisplay = await getListById(listId);
      setList(listToDisplay);
  };

  const onToggleDoneTasks = (newShowDone) => {
    const newTitle = newShowDone ? "All tasks" : "Undone tasks";
    setTitle(newTitle);
    setShowDone(newShowDone);
  };

  const onAddTask = (task) => {
    task.id = tasks.reduce((max, { id }) => Math.max(max, id), 0) + 1;
    task.list_id = listId;
    tasks.push(task);
    list.push(task);
    const listToDisplay = [...list];
    setList(listToDisplay);
  };

  const onTaskCheck = (id) => {
    const task = tasks.find((t) => t.id === id);
    task.done = !task.done;
  };

  const onTaskDelete = (id) => {
    const indexToDelete = tasks.findIndex((t) => t.id === id);
    tasks.splice(indexToDelete, 1);
    const listToDisplay = list.filter((t) => t.id !== id);
    setList(listToDisplay);
  };

  return (
    <>
      <Sidebar
        onListIdChange={onListIdChange}
        onToggleDoneTasks={onToggleDoneTasks}
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

export default App;
