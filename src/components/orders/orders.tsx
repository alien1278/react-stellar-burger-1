import styles from "./orders.module.css";
import { TOrder } from "../../utils/types";
import OrderCard from "../order-card/order-card";
import Modal from "../modal/modal";
import FeedId from "../../pages/feed-id/feed-id";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { useState } from "react";

interface IOrdersProps {
  data: TOrder[];
}

const Orders = ({ data }: IOrdersProps) => {
  return (
    <>
      <ul className={`${styles.list} custom-scroll`}>
        {data.map((i) => (
          <OrderCard key={i._id} data={i} />
        ))}
      </ul>
      {/* {console.log("navParams", navParams)}
      {console.log("navParams.id", navParams.id)} */}
    </>
  );
};

export default Orders;
