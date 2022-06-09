import SectionHeader from "../SharedComponents/SectionHeader";
import EmptyBox from "../SharedComponents/EmptyBox";
import Task from "./Task/Task";
import "./List.css";

export default function List(params) {
  const { list, title, onTaskDelete, onTaskCheck } = params;
  let listClass = "list" + (params.showDone ? " list_show-done" : "");

  function onDelete(id) {
    onTaskDelete(id);
  }

  function onCheck(id) {
    onTaskCheck(id);
  }
  return (
    <section className={listClass}>
      <SectionHeader title={title} />
      <section className="list__tasks">
        {list.length ? (
          list.map((t) => (
            <Task task={t} key={t.id} onDelete={onDelete} onCheck={onCheck} />
          ))
        ) : (
          <EmptyBox
            className={"list__empty"}
            title={"No tasks here. Surely you can add one"}
          />
        )}
      </section>
    </section>
  );
}
