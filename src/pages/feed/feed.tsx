import styles from "./feed.module.css";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import {
  selectOrders,
  selectStats,
  wsClose,
  wsInit,
} from "../../services/ws-orderSlice";
import Orders from "../../components/orders/orders";
import Stats from "../../components/stats/stats";
import Modal from "../../components/modal/modal";
import FeedId from "../feed-id/feed-id";
import { useNavigate, useParams } from "react-router-dom";
interface NavParams {
  id?: string;
}
const OrdersFeed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const stats = useAppSelector(selectStats);
  const navParams: NavParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(wsInit("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  if (!stats) {
    // console.error("Token is missing");
    return null;
  }

  if (!orders) {
    console.error("Token is missing");
    return null;
  }

  return (
    <div className={styles.feed}>
      <h1 className="text text_type_main-large title">Лента заказов</h1>
      <div className={styles.orders}>
        <Orders data={orders} />
      </div>
      <div className={styles.stats}>
        <Stats data={stats} />
      </div>
      {navParams && navParams.id && (
        <Modal title="" onClose={() => navigate("/feed")}>
          <FeedId />
        </Modal>
      )}
    </div>
  );
};

export default OrdersFeed;
