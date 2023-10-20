import { createOrderRequest } from "../../utils/api";
import {
  getCreatedOrder,
  getCreatedOrderFailed,
  getCreatedOrderSuccess,
} from "../orderSlice";

export function sendOrder(ingredientsId) {
  return function (dispatch) {
    dispatch(getCreatedOrder());
    return createOrderRequest(ingredientsId)
      .then((res) => {
        if (res && res.success) {
          console.log(res);
          dispatch(getCreatedOrderSuccess(res));
        }
      })
      .catch((err) => dispatch(getCreatedOrderFailed()));
  };
}
