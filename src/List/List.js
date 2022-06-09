import "./List.css";
import Task from "./Task/Task";

export default function List(params) {
  const { list, onTaskDelete, onTaskCheck } = params;
  let listClass = "list" + (params.showDone ? " list_show-done" : "");

  function onDelete(id) {
    onTaskDelete(id);
  }

  function onCheck(id) {
    onTaskCheck(id);
  }
  return (
    <section className={listClass}>
      <h3 className="list__name">Undone tasks</h3>
      <section className="list__tasks">
        {list.map((t) => (
          <Task task={t} key={t.id} onDelete={onDelete} onCheck={onCheck} />
        ))}
      </section>
    </section>
  );
}
