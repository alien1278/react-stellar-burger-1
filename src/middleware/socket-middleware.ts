import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Middleware, AnyAction, MiddlewareAPI } from "redux";

export type SocketActions = {
  wsInit: ActionCreatorWithPayload<string, string>;
  sendMessage: ActionCreatorWithPayload<any, string>;
  onOpen: ActionCreatorWithPayload<void, string>;
  onError: ActionCreatorWithPayload<void, string>;
  onMessage: ActionCreatorWithPayload<any, string>;
  onClose: ActionCreatorWithPayload<void, string>;
  wsClose: ActionCreatorWithPayload<void, string>;
};

export const socketMiddleware = (actions: SocketActions): Middleware => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    let currentUrl: string;

    return (next) => (action: AnyAction) => {
      const { dispatch } = store;

      if (actions.wsInit.match(action)) {
        if (currentUrl === action.payload) return;
        currentUrl = action.payload;

        socket = new WebSocket(action.payload);

        socket.onopen = () => {
          dispatch(actions.onOpen());
        };

        socket.onerror = () => {
          dispatch(actions.onError());
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(actions.onMessage(restParsedData));
        };

        let currentSocket = socket;
        socket.onclose = () => {
          if (socket === currentSocket) {
            socket = null;
            dispatch(actions.onClose());
          }
        };
      } else if (actions.sendMessage.match(action)) {
        if (!socket) throw new Error("Socket not found");

        socket.send(JSON.stringify(action.payload));
      } else if (actions.wsClose.match(action)) {
        socket?.close();
        socket = null;
      }

      next(action);
    };
  };
};
