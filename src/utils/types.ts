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
  count?: number;
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

export interface IOrderPayload {
  name: string;
  order: { number: number };
  success: boolean;
}
export interface IResponse {
  ok: boolean;
  status: number;
  json: () => Promise<any>;
}

export interface IIngredientDetailsProps {
  id: string;
}
export type TOrder = {
  _id: string;
  status: string | "pending" | "done";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};
