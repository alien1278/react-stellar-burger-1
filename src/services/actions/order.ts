import { IIngredient } from "./../../utils/types";
import { AppDispatch, RootState } from "./../store";
import { createOrderRequest } from "../../utils/api";
import { getCreatedOrderFailed, getCreatedOrderSuccess } from "../orderSlice";

export function sendOrder(ingredientsId: IIngredient[]) {
  return function (dispatch: AppDispatch, getState: () => RootState) {
    const token = getState().users.token;
    if (!token) {
      dispatch(getCreatedOrderFailed());

      return Promise.reject();
    }
    return createOrderRequest(ingredientsId, token)
      .then((res) => {
        if (res && res.success) {
          // console.log(res);
          dispatch(getCreatedOrderSuccess(res));
        }
      })
      .catch((err) => dispatch(getCreatedOrderFailed()));
  };
}
