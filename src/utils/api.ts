import { IIngredient } from "./types";
import {
  request,
  INGREDIENTS_URL,
  ORDERS_URL,
  PASSWORD_RESET_URL,
  PASSWORD_RESET_RESET_URL,
  LOGIN_URL,
  USER_URL,
  REGISTER_URL,
  TOKEN_URL,
  LOGOUT_URL,
  ORDERS_ALL_URL,
} from "./api-constants";

export const getIngredientsRequest = () => request(INGREDIENTS_URL, {});

export const createOrderRequest = (
  ingredients: IIngredient[],
  token: string
) => {
  return request(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};

export const sendEmailRequest = (email: string) => {
  return request(PASSWORD_RESET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
};

export const resetPasswordRequest = (password: string, code: string) => {
  return request(PASSWORD_RESET_RESET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: code,
    }),
  });
};

export const loginRequest = (email: string, password: string) => {
  return request(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const registerRequest = (
  email: string,
  name: string,
  password: string
) => {
  return request(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
};

export const getUserDataRequest = (token: string) => {
  return request(USER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  });
};
export const sendUserInfoRequest = (
  token: string,
  name: string,
  email: string,
  password: string
) => {
  return request(USER_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify({
      email: email,
      name: name,
      password: password,
    }),
  });
};
export const refreshTokenRequest = (refreshToken: string) => {
  return request(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};
export const logoutRequest = (refreshToken: string) => {
  return request(LOGOUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
};

export const ordersRequest = (token?: string) => {
  return request(ORDERS_ALL_URL, {
    method: "GET", // или другой метод, если необходимо
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
};
