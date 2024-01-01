import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder } from "../utils/types";
import { RootState } from "./store";

type TWsOrdersState = {
  isConnected: boolean;
  data: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  } | null;
};

const initialState: TWsOrdersState = {
  isConnected: false,
  data: null,
};

const wsOrdersSlice = createSlice({
  name: "wsOrders",
  initialState,
  reducers: {
    onMessage: (
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) => {
      return { ...state, data: action.payload };
    },
    onError: (state) => {
      return { ...state, isConnected: false };
    },
    onOpen: (state) => {
      return { ...state, isConnected: true };
    },
    onClose: (state) => {
      return { ...state, isConnected: false };
    },
    wsInit: (state) => {
      return state;
    },
    wsInitAuthed: (state, action: PayloadAction<string>) => {
      return state;
    },
    sendMessage: (state, action: PayloadAction<any>) => {
      return state;
    },
  },
});

export const wsOrdersSliceReducer = wsOrdersSlice.reducer;
export const {
  onMessage,
  onClose,
  onOpen,
  onError,
  wsInit,
  wsInitAuthed,
  sendMessage,
} = wsOrdersSlice.actions;

export const selectOrders = (state: RootState) =>
  state.wsOrder.data?.orders || [];

export const selectStats = (state: RootState) => ({
  total: state.wsOrder.data?.total,
  totalToday: state.wsOrder.data?.totalToday,
});
export const updateOrders = createAction<TOrder[]>("updateOrders");

export default wsOrdersSlice.reducer;
