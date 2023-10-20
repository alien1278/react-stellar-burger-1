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
} from "./api-constants";

export const getIngredientsRequest = () => request(INGREDIENTS_URL, {});

export const createOrderRequest = (ingredients) => {
  return request(ORDERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  });
};

export const sendEmailRequest = (email) => {
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

export const resetPasswordRequest = (password, code) => {
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

export const loginRequest = (email, password) => {
  return request(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const registerRequest = (email, name, password) => {
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

export const getUserDataRequest = (token) => {
  return request(USER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
  });
};
export const sendUserInfoRequest = (token, name, email, password) => {
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
export const refreshTokenRequest = (refreshToken) => {
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
export const logoutRequest = (refreshToken) => {
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
