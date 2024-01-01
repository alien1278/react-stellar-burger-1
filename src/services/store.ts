import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { newIngredientsSliceReducer } from "./ingredientsSlice";
import { modalSliceReducer } from "./modalSlice";
import { orderSliceReducer } from "./orderSlice";
import { usersSliceReducer } from "./usersSlice";
import { wsOrdersSliceReducer } from "./ws-orderSlice";
import { socketMiddleware } from "../middleware/socket-middleware";

const rootReducer = combineReducers({
  ingredients: newIngredientsSliceReducer,
  modal: modalSliceReducer,
  order: orderSliceReducer,
  users: usersSliceReducer,
  wsOrder: wsOrdersSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware()),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>; // они нужны в ./hook.ts
export type AppDispatch = typeof store.dispatch;
