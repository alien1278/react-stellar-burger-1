const URL = "https://norma.nomoreparties.space/api";
export const INGREDIENTS_URL = `${URL}/ingredients`;
export const ORDERS_URL = `${URL}/orders`;

export const PASSWORD_RESET_URL = `${URL}/password-reset`;
export const PASSWORD_RESET_RESET_URL = `${URL}/password-reset/reset`;
export const LOGIN_URL = `${URL}/auth/login`;
export const REGISTER_URL = `${URL}/auth/register`;
export const USER_URL = `${URL}/auth/user`;
export const TOKEN_URL = `${URL}/auth/token`;
export const LOGOUT_URL = `${URL}/auth/logout`;

export const TOKEN_EXPIRED = "Ошибка: 403";
export const UNAUTHORIZED = "Ошибка: 401";
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const request = (url, options) =>
  fetch(url, options).then(checkResponse);
