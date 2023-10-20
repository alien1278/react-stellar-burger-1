const URL = "https://norma.nomoreparties.space/api";
export const INGREDIENTS_URL = `${URL}/ingredients`;
export const ORDERS_URL = `${URL}/orders`;

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const request = (url, options) =>
  fetch(url, options).then(checkResponse);
