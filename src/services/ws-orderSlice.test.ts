import {
  wsOrdersSliceReducer,
  onMessage,
  onClose,
  onOpen,
  onError,
  wsInit,
  wsClose,
  sendMessage,
  initialState,
} from "./ws-orderSlice";
import { TOrder } from "../utils/types";

describe("wsOrdersSlice reducer", () => {
  const mockOrdersData = {
    orders: [
      {
        _id: "order1",
        status: "pending",
        name: "Заказ №1",
        createdAt: "2021-07-21T14:48:00.000Z",
        updatedAt: "2021-07-21T14:48:00.000Z",
        number: 123,
        ingredients: ["ingredient1", "ingredient2"],
      },
      {
        _id: "order2",
        status: "done",
        name: "Заказ №2",
        createdAt: "2021-07-22T14:48:00.000Z",
        updatedAt: "2021-07-22T14:48:00.000Z",
        number: 124,
        ingredients: ["ingredient3", "ingredient4"],
      },
    ] as TOrder[],
    total: 100,
    totalToday: 5,
  };

  it("должен обрабатывать начальное состояние", () => {
    expect(wsOrdersSliceReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("должен обрабатывать onMessage", () => {
    expect(
      wsOrdersSliceReducer(initialState, onMessage(mockOrdersData))
    ).toEqual({
      ...initialState,
      data: mockOrdersData,
    });
  });

  it("должен обрабатывать onError", () => {
    expect(wsOrdersSliceReducer(initialState, onError())).toEqual({
      ...initialState,
      isConnected: false,
    });
  });

  it("должен обрабатывать onOpen", () => {
    expect(wsOrdersSliceReducer(initialState, onOpen())).toEqual({
      ...initialState,
      isConnected: true,
    });
  });

  it("должен обрабатывать onClose", () => {
    expect(wsOrdersSliceReducer(initialState, onClose())).toEqual({
      ...initialState,
      isConnected: false,
    });
  });

  it("должен обрабатывать wsInit", () => {
    const wsUrl = "wss://some-url";
    expect(wsOrdersSliceReducer(initialState, wsInit(wsUrl))).toEqual(
      initialState
    );
  });

  it("должен обрабатывать wsClose", () => {
    expect(wsOrdersSliceReducer(initialState, wsClose())).toEqual({
      ...initialState,
      isConnected: false,
    });
  });

  it("должен обрабатывать sendMessage", () => {
    const message = { type: "TEST_MESSAGE", payload: {} };
    expect(wsOrdersSliceReducer(initialState, sendMessage(message))).toEqual(
      initialState
    );
  });
});
