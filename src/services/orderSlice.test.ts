import {
  orderSliceReducer,
  getCreatedOrder,
  getCreatedOrderSuccess,
  getCreatedOrderFailed,
} from "./orderSlice";

describe("orderSlice reducer", () => {
  const initialState = {
    createdOrder: null,
    orderFailed: false,
    orderRequest: false,
  };

  it("должен обрабатывать начальное состояние", () => {
    expect(orderSliceReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен обрабатывать getCreatedOrder", () => {
    expect(orderSliceReducer(initialState, getCreatedOrder())).toEqual({
      ...initialState,
      orderRequest: true,
      orderFailed: false,
    });
  });

  it("должен обрабатывать getCreatedOrderSuccess", () => {
    const orderPayload = {
      name: "",
      order: { number: 12345 },
      success: true,
    };

    expect(
      orderSliceReducer(initialState, getCreatedOrderSuccess(orderPayload))
    ).toEqual({
      ...initialState,
      createdOrder: orderPayload,
      orderRequest: false,
    });
  });

  it("должен обрабатывать getCreatedOrderFailed", () => {
    expect(orderSliceReducer(initialState, getCreatedOrderFailed())).toEqual({
      ...initialState,
      orderRequest: false,
      orderFailed: true,
    });
  });
});
