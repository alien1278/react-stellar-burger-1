import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
  name: "order",
  initialState: {
    createdOrder: null,
    orderFailed: false,
    orderRequest: false,
  },
  reducers: {
    getCreatedOrder(state) {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    getCreatedOrderSuccess(state, action) {
      state.orderRequest = false;
      state.createdOrder = action.payload;
    },
    getCreatedOrderFailed(state) {
      state.orderRequest = false;
      state.orderFailed = true;
    },
  },
});

export const orderSliceReducer = orderSlice.reducer;

export const {
  getCreatedOrder,
  getCreatedOrderSuccess,
  getCreatedOrderFailed,
} = orderSlice.actions;
