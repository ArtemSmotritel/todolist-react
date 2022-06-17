import { useDispatch, useSelector } from "react-redux";

import { NavLink } from "react-router-dom";

import { useEffect } from "react";

import SectionHeader from "../SharedComponents/SectionHeader";
import ListItem from "./ListItem";
import "./Sidebar.css";

import { fetchDashboard } from "../store/dashboard/reducer";

export default function Sidebar() {
  const dispatch = useDispatch();

  const lists = useSelector((state) => state.dashboard.lists) || [];
  const taskCount = useSelector((state) => state.dashboard.today) || 0;

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  return (
    <aside className="sidebar">
      <h1 className="sidebar__main-header">TODO list</h1>
      <NavLink className="sidebar__today" to={"/today"}>
        Tasks for today
        <span className="sidebar__task-count">({taskCount})</span>
      </NavLink>
      <SectionHeader title="Your lists" />
      <ul className="list-of-lists">
        {lists.map((l) => (
          <ListItem list={l} key={l.id} />
        ))}
      </ul>
    </aside>
  );
}
