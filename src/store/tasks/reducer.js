import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TASKS_FETCH, TASK_ADD, TASK_DELETE, TASK_UPDATE } from "./actions";

import {
  addTaskOnServer,
  deleteTaskOnServer,
  getListOrToday,
  updateTaskOnServer,
} from "../../serverFunctions";

const initialState = {
  name: "default",
  tasks: [],
};

export const getTasks = createAsyncThunk(TASKS_FETCH, getListOrToday);

export const checkTask = createAsyncThunk(
  TASK_UPDATE,
  async ({ id, newDone }) => {
    await updateTaskOnServer(id, { done: newDone });
    return id;
  }
);

export const deleteTask = createAsyncThunk(TASK_DELETE, deleteTaskOnServer);

export const addTask = createAsyncThunk(TASK_ADD, async ({ task, listId }) => {
  const id = await addTaskOnServer(task, listId);
  task.id = id;
  return task;
});

const tasksSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.tasks = payload.tasks;
      })
      .addCase(checkTask.fulfilled, (state, { payload }) => {
        const task = state.tasks.find((t) => t.id === payload);
        task.done = !task.done;
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.filter((t) => t.id !== payload);
      })
      .addCase(addTask.fulfilled, (state, { payload }) => {
        state.tasks.push(payload);
      });
  },
});

export default tasksSlice.reducer;
