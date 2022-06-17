import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from './dashboard/reducer';
import tasksReducer from './tasks/reducer';

const store = configureStore({reducer: {
    dashboard: dashboardReducer,
    list: tasksReducer
}});

export default store;