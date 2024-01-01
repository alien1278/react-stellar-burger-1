import { useEffect } from "react";
import Orders from "../../components/orders/orders";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { selectOrders, wsInitAuthed } from "../../services/ws-orderSlice";
import styles from "./feed-history.module.css";

const OrdersFeedHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  const token = useAppSelector((store) => store.users.token);
  useEffect(() => {
    if (!token) return;
    dispatch(wsInitAuthed(token.replace("Bearer ", "")));
  }, [dispatch, token]);
  if (!orders) {
    console.error("Token is missing");
    return null;
  }
  return (
    <div className={styles.history}>
      <div className={styles.root}>
        <Orders data={orders} />
      </div>
    </div>
  );
};

export default OrdersFeedHistory;
