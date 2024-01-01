import React, { FC } from "react";
import style from "./order-details.module.css";
import image from "../../images/done.svg";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../services/hook";

const OrderDetails: FC = () => {
  const { createdOrder } = useAppSelector((state) => state.order);

  return (
    <div className={`${style.modal}`}>
      <div className="text text_type_digits-large mb-8 ">
        {createdOrder && createdOrder.order && (
          <p>{createdOrder.order.number}</p>
        )}
      </div>
      <p className="text text_type_main-default">Индификатор заказа</p>
      <img src={image} alt="" className={`${style.image} m-15`} />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`${style.text} text text_type_main-default mb-30`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
