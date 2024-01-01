import { IIngredient } from "./../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as generateUniqueId } from "uuid";
import { RootState } from "./store";

type TIngredientsState = {
  list: IIngredient[];
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  chosenIngredients: IIngredient[];
};
const initialState: TIngredientsState = {
  list: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  chosenIngredients: [],
};
const newIngredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    getIngredientRequest(state) {
      state.ingredientsRequest = true;
    },
    getIngredientsSuccess(state, action: PayloadAction<IIngredient[]>) {
      state.ingredientsFailed = false;
      state.ingredientsRequest = false;
      state.list = action.payload;
    },
    getIngredientsFailed(state) {
      state.ingredientsFailed = true;
      state.ingredientsRequest = true;
    },

    sortConstructorIngredients(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const dragCard = state.chosenIngredients[action.payload.dragIndex];
      state.chosenIngredients.splice(action.payload.dragIndex, 1);
      state.chosenIngredients.splice(action.payload.hoverIndex, 0, dragCard);
    },
    deleteIngredient(state, action: PayloadAction<number>) {
      state.chosenIngredients = state.chosenIngredients.filter(
        (item, index) => index !== action.payload
      );
    },
    clearIngredients(state) {
      state.chosenIngredients = []; // Обнуляем массив выбранных ингредиентов
    },
    addIngredient(state, action: PayloadAction<{ id: string }>) {
      const foundIngredient = state.list.find(
        (ingredient) => ingredient._id === action.payload.id
      );
      if (!foundIngredient) return;
      const targetIngredient: IIngredient = {
        ...foundIngredient,
        uuid: generateUniqueId(),
      };

      if (targetIngredient.type === "bun") {
        state.chosenIngredients = state.chosenIngredients.filter(
          ({ type }) => type !== "bun"
        );

        state.chosenIngredients.push(targetIngredient);
        state.chosenIngredients.push(targetIngredient);
      } else {
        state.chosenIngredients.push(targetIngredient);
      }
    },
  },
});
export const selectIngredients = (state: RootState) => {
  return state.ingredients.list;
};
export const newIngredientsSliceReducer = newIngredientsSlice.reducer;

export const {
  getIngredientRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  deleteIngredient,
  clearIngredients,
  sortConstructorIngredients,
  addIngredient,
} = newIngredientsSlice.actions;
