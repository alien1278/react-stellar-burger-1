import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    name: undefined, // order or details
    data: undefined, //
  },
  reducers: {
    showModal(state, action) {
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
