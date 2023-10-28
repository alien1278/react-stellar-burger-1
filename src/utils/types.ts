// import PropTypes from "prop-types";

// export const ingredientType = PropTypes.shape({
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   proteins: PropTypes.number.isRequired,
//   fat: PropTypes.number.isRequired,
//   carbohydrates: PropTypes.number.isRequired,
//   calories: PropTypes.number.isRequired,
//   price: PropTypes.number.isRequired,
//   image: PropTypes.string.isRequired,
// });

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  uuid?: string;
}

export interface IUserInfo {
  email: string;
  name: string;
}
export interface IUserData {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: IUserInfo | null;
}
export interface IDragItem {
  id: string;
  index: number;
}

export interface IModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

// export interface IOrderPayload {
//   order: {
//     number: number
//   }
// }
export interface IOrderPayload {
  name: string;
  order: { number: number };
  success: boolean;
}