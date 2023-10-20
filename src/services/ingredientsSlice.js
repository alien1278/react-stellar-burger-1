import { createSlice } from "@reduxjs/toolkit";
import { v4 as generateUniqueId } from "uuid";

const newIngredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    list: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    chosenIngredients: [],
  },
  reducers: {
    getIngredientRequest(state) {
      state.ingredientsRequest = true;
    },
    getIngredientsSuccess(state, action) {
      state.ingredientsFailed = false;
      state.ingredientsRequest = false;
      state.list = action.payload;
    },
    getIngredientsFailed(state) {
      state.ingredientsFailed = true;
      state.ingredientsRequest = true;
    },

    sortConstructorIngredients(state, action) {
      const dragCard = state.chosenIngredients[action.payload.dragIndex];
      state.chosenIngredients.splice(action.payload.dragIndex, 1);
      state.chosenIngredients.splice(action.payload.hoverIndex, 0, dragCard);
    },
    deleteIngredient(state, action) {
      state.chosenIngredients = state.chosenIngredients.filter(
        (item, index) => index !== action.payload
      );
    },

    addIngredient(state, action) {
      const targetIngredient = {
        ...state.list.find(
          (ingredient) => ingredient._id === action.payload.id
        ),
      };

      targetIngredient.uuid = generateUniqueId();

      if (targetIngredient.type === "bun") {
        state.chosenIngredients = state.chosenIngredients.filter(
          ({ type }) => type !== "bun"
        );
        state.chosenIngredients.push(targetIngredient);
      } else {
        state.chosenIngredients.push(targetIngredient);
      }
    },
  },
});

export const newIngredientsSliceReducer = newIngredientsSlice.reducer;

export const {
  getIngredientRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  deleteIngredient,
  sortConstructorIngredients,
  addIngredient,
} = newIngredientsSlice.actions;
