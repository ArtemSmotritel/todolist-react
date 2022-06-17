import { useParams } from "react-router-dom";

import NewTaskForm from "./NewTaskForm/NewTaskForm";
import List from "./List/List";
import "./List/List.css";

export default function TodoListPage() {
  const { id: listId } = useParams();
  return (
    <>
      <List />
      <NewTaskForm listId={listId} />
    </>
  );
}
