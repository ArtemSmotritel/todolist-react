import { useParams } from "react-router-dom";
import List from "./List/List";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import { addTaskOnServer } from "./serverFunctions";

export default function TodoListPage() {
  const { id: listId } = useParams();

  const onAddTask = async (task) => {
    const { id } = await addTaskOnServer(task, listId);
    task.list_id = listId;
    task.id = id;
  };

  return (
    <>
      <List />
      <NewTaskForm onAddTask={onAddTask} />
    </>
  );
}
