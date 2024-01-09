import React, { FC, useEffect } from "react";
import styles from "./feed-id.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
//import { useAppDispatch, useAppSelector } from "../../hook/hook";
import IngredientImage from "../../components/ingredient-image/ingredient-image";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { selectOrders, wsClose, wsInit } from "../../services/ws-orderSlice";
import { formatDate } from "../../utils/constants";
import { useOrderIngredients } from "../../services/hooks/useOrderIngredients";
//import { useOrderIngredients } from "../../services/hooks/useOrderIngredients";

export enum OrderReadyStatus {
  PENDING = "pending",
  DONE = "done",
}

export enum OrderStatusOutput {
  PENDING = "Готовится",
  DONE = "Выполнен",
}

const FeedId: FC<{ authed?: boolean }> = ({ authed }) => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const orders = useAppSelector(selectOrders);
  const ordersFromSockets = orders?.find((o) => String(o.number) === id);
  const { orderIngredients, sum, uniqueOrderIngredients } =
    useOrderIngredients(ordersFromSockets);
  const token = useAppSelector((store) => store.users.token);
  useEffect(() => {
    if (authed) {
      if (!token) return;
      dispatch(
        wsInit(
          `wss://norma.nomoreparties.space/orders?token=${token.replace(
            "Bearer ",
            ""
          )}`
        )
      );
    } else {
      dispatch(wsInit("wss://norma.nomoreparties.space/orders/all"));
    }

    return () => {
      dispatch(wsClose());
    };
  }, [authed, dispatch, token]);

  if (!orderIngredients || !ordersFromSockets) {
    return null;
  }

  const orderStatus =
    ordersFromSockets.status.toUpperCase() as keyof typeof OrderStatusOutput;

  return (
    <div className={styles.root}>
      <p
        className="text text_type_digits-default mb-10"
        style={{ textAlign: "start" }}
      >
        #{ordersFromSockets.number}
      </p>

      <h1 className="text text_type_main-medium mb-3">
        {ordersFromSockets.name}
      </h1>

      <p className="text text_type_main-default mb-15">
        {OrderStatusOutput[orderStatus]}
      </p>

      <p className="text text_type_main-medium mb-6">Состав:</p>
      <div className={`${styles.list} custom-scroll mb-10`}>
        {uniqueOrderIngredients?.map((ingredient, index) =>
          ingredient.image ? (
            <ul className={styles.ingredient} key={index}>
              <IngredientImage src={ingredient.image} />
              <p
                className={`${styles.title} text text_type_main-default ml-4 mr-4`}
              >
                {ingredient.name}
              </p>
              <p
                className={`${styles.title} text text_type_main-default ml-4 mr-4`}
              >
                {ingredient.count + "x" + ingredient.price}
              </p>
            </ul>
          ) : null
        )}
      </div>

      <div className={styles.info}>
        <time className="text text_type_main-default text_color_inactive">
          {formatDate(ordersFromSockets.createdAt)} i-GMT+3
        </time>

        <div style={{ marginLeft: "auto" }} className={styles.priceContainer}>
          <span className="text text_type_main-default mr-2">
            {sum ? sum : "–"}
          </span>{" "}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedId;
