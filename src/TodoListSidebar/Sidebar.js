import SectionHeader from "../SharedComponents/SectionHeader";
import ListItem from "./ListItem";
import "./Sidebar.css";

export default function Sidebar(params) {
  const { onListIdChange, onToggleDoneTasks, listOfLists } = params;

  const handleCheck = (e) => {
    const showAllTasks = e.target.checked;
    onToggleDoneTasks(showAllTasks);
  };

  const handleListChange = (e) => {
    if (e.target.id) {
      const id = +e.target.id.split("-")[1];
      onListIdChange(id);
    }
  };

  return (
    <aside className="sidebar">
      <h1 className="sidebar__main-header">TODO list</h1>
      <div className="sidebar__checkbox-container">
        <input
          className="sidebar__checkbox"
          type="checkbox"
          id="sidebar-toggle"
          onChange={handleCheck}
        ></input>
        <label className="sidebar__checkbox-label" htmlFor="sidebar-toggle">
          Show all tasks
        </label>
      </div>
      <SectionHeader title={"Your lists"} />
      <ul className="list-of-lists" onClick={handleListChange}>
        {listOfLists.map((l) => (
          <ListItem name={l.name} id={l.id} key={l.id}/>
        ))}
      </ul>
    </aside>
  );
}
