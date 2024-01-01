import { Middleware, AnyAction, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../services/store";
import {
  onClose,
  onError,
  onMessage,
  onOpen,
  sendMessage,
  wsInit,
  wsInitAuthed,
} from "../services/ws-orderSlice";

export const socketMiddleware = (): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let socketParams: string | null = null;

    return (next) => (action: AnyAction) => {
      // console.log(store.getState());
      const { dispatch } = store;

      if (wsInit.match(action)) {
        if (!socket || (socket && socketParams !== "empty")) {
          socket?.close();
          socket = new WebSocket("wss://norma.nomoreparties.space/orders/all");
          socketParams = "empty";
        }
      }

      if (wsInitAuthed.match(action)) {
        if (!socket || (socket && socketParams !== action.payload)) {
          socket?.close();
          socket = new WebSocket(
            `wss://norma.nomoreparties.space/orders?token=${action.payload}`
          );
          socketParams = action.payload;
        }
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(onMessage(restParsedData));
        };

        let currentSocket = socket;
        socket.onclose = () => {
          if (socket === currentSocket) {
            socket = null;
            socketParams = null;
            dispatch(onClose());
          }
        };

        if (sendMessage.match(action)) {
          socket.send(JSON.stringify(action.payload));
        }
      }

      next(action);
    };
  };
};
