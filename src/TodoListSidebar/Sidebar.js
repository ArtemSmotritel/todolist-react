import SectionHeader from "../SharedComponents/SectionHeader";
import "./Sidebar.css";

export default function Sidebar(params) {
  const { onListIdChange, onToggleDoneTasks } = params;

  const handleCheck = (e) => {
    const showAllTasks = e.target.checked;
    onToggleDoneTasks(showAllTasks);
  };

  const handleListChange = (e) => {
    if (e.target.id) {
      const id = +e.target.id.split("-")[1];
      console.log('SIDEBAR', id);
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
        <li className="list-of-lists__item" id="list-1">
          Easy tasks
        </li>
        <li className="list-of-lists__item" id="list-2">
          Hard tasks
        </li>
      </ul>
    </aside>
  );
}
