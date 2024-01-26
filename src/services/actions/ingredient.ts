import { AppDispatch } from '../store';
import { getIngredientsRequest } from "../../utils/api";
import {
  getIngredientRequest,
  getIngredientsFailed,
  getIngredientsSuccess,
} from "../ingredientsSlice";

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientRequest());
    return getIngredientsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch(getIngredientsSuccess(res.data));
        }
      })
      .catch((err) => dispatch(getIngredientsFailed()));
  };
}
