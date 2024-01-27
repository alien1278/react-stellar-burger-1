import { IOrderPayload } from "./../utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TOrderState = {
  createdOrder: IOrderPayload | null;
  orderFailed: boolean;
  orderRequest: boolean;
};
export const initialState: TOrderState = {
  createdOrder: null,
  orderFailed: false,
  orderRequest: false,
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getCreatedOrder(state) {
      state.orderRequest = true;
      state.orderFailed = false;
    },
    getCreatedOrderSuccess(state, action: PayloadAction<IOrderPayload>) {
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
