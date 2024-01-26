import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import dayjs from "dayjs";
import { TOrder } from "../../utils/types";
import IngredientImage from "../ingredient-image/ingredient-image";
import { useAppSelector } from "../../services/hook";
import { useMemo } from "react";
import { formatDate } from "../../utils/constants";
import { useOrderIngredients } from "../../services/hooks/useOrderIngredients";
import Modal from "../modal/modal";
import FeedId from "../../pages/feed-id/feed-id";
// import { useOrderIngredients } from "../../services/hooks/useOrderIngredients";

interface IFeedCardProps {
  data: TOrder;
}
interface NavParams {
  id?: string;
}

const OrderCard = ({ data }: IFeedCardProps) => {
  const location = useLocation();
  const navParams: NavParams = useParams();
  const navigate = useNavigate();

  const { orderIngredients, sum } = useOrderIngredients(data);

  if (!orderIngredients) {
    return null;
  }

  return (
    <li className={styles.cardContainer}>
      <NavLink
        className={styles.card}
        to={`${data.number}`}
        state={{ showModal: true }}
      >
        <p className={`${styles.header} text text_type_digits-default`}>
          #{data.number}{" "}
          <time className="text text_type_main-default text_color_inactive">
            {formatDate(data.createdAt)} i-GMT+3
          </time>
        </p>
        <h2 className={`${styles.title} text text_type_main-medium`}>
          {data.name}
        </h2>

        <div className={styles.container}>
          <ul className={styles.ingredientsList}>
            {orderIngredients.length > 5 ? (
              <IngredientImage
                src={orderIngredients[5].image || ""}
                remainCount={orderIngredients.length - 5}
              />
            ) : null}
            {orderIngredients
              .slice(0, 5)
              .map((ingredient, index) =>
                ingredient.image ? (
                  <IngredientImage key={index} src={ingredient.image} />
                ) : null
              )}
          </ul>

          <p className={styles.priceContainer}>
            <span className={`${styles.price} text text_type_digits-default`}>
              {sum ? sum : "–"}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </NavLink>
    </li>
  );
};

export default OrderCard;
