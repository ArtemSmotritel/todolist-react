import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DASHBOARD_FETCH } from "./actions";
import { getLists } from "../../serverFunctions";

const initialState = {
  today: 0,
  lists: [],
  openedTasks: {},
};

export const fetchDashboard = createAsyncThunk(DASHBOARD_FETCH, getLists);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    incTaskCount(state, { payload }) {
      const { list_id, forToday } = payload;
      state.openedTasks[list_id]++;
      if (forToday) {
        state.today++;
      }
    },
    decrTaskCount(state, { payload }) {
      const { list_id, forToday } = payload;
      state.openedTasks[list_id]--;
      if (forToday) {
        state.today--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboard.fulfilled, (state, { payload }) => {
      const { tasks_for_today, undone_tasks_by_list } = payload;

      state.today = tasks_for_today;
      state.lists = undone_tasks_by_list;
      state.openedTasks = Object.fromEntries(
        undone_tasks_by_list.map((list) => [list.id, list.tasks_count])
      );
    });
  },
});

export default dashboardSlice.reducer;

export const { incTaskCount, decrTaskCount } = dashboardSlice.actions;
