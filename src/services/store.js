import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { newIngredientsSliceReducer } from "./ingredientsSlice";
import { modalSliceReducer } from "./modalSlice";
import { orderSliceReducer } from "./orderSlice";

const rootReducer = combineReducers({
  ingredients: newIngredientsSliceReducer,
  modal: modalSliceReducer,
  order: orderSliceReducer,
});

export const store = configureStore({ reducer: rootReducer, devTools: true });
