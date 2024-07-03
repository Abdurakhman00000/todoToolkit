import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./todo/TodoSlice";


export const store = configureStore({
    reducer: {
        todo: TodoSlice,
    },
});