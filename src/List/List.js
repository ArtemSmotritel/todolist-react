import SectionHeader from "../SharedComponents/SectionHeader";
import EmptyBox from "../SharedComponents/EmptyBox";
import Task from "./Task/Task";
import "./List.css";

export default function List(params) {
  const { list, title, onTaskDelete, onTaskCheck, showDone } = params;
  
  return (
    <section className={`list ${showDone && "list_show-done"}`}>
      <SectionHeader title={title} />
      <section className="list__tasks">
        {list.length ? (
          list.map((t) => (
            <Task task={t} key={t.id} onDelete={onTaskDelete} onCheck={onTaskCheck} />
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
