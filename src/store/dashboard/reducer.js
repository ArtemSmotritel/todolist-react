import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { DASHBOARD_FETCH } from "./actions";
import { getLists } from "../../serverFunctions";

const initialState = {
  today: 0,
  lists: [],
};

export const fetchDashboard = createAsyncThunk(DASHBOARD_FETCH, getLists);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.fulfilled, (state, { payload }) => {
        const { tasks_for_today, undone_tasks_by_list } = payload;
        state.today = tasks_for_today;
        state.lists = undone_tasks_by_list;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
