import { IIngredient } from "./../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TModalState = {
  name: string | undefined; // order, details, or undefined
  data?: IIngredient | any | undefined; // Adjust "any" if there are specific types you're expecting
};

const initialState: TModalState = {
  name: undefined, // order or details
  data: undefined,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<TModalState>) {
      state.name = action.payload.name;
      state.data = action.payload.data;
    },
    hideModal(state) {
      state.name = undefined;
      state.data = undefined;
    },
  },
});

export const modalSliceReducer = modalSlice.reducer;
export const { showModal, hideModal } = modalSlice.actions;
