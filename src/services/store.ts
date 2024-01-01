import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { newIngredientsSliceReducer } from "./ingredientsSlice";
import { modalSliceReducer } from "./modalSlice";
import { orderSliceReducer } from "./orderSlice";
import { usersSliceReducer } from "./usersSlice";

const rootReducer = combineReducers({
  ingredients: newIngredientsSliceReducer,
  modal: modalSliceReducer,
  order: orderSliceReducer,
  users: usersSliceReducer,
});

export const store = configureStore({ reducer: rootReducer, devTools: true });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
