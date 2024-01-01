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

  // const { list } = useAppSelector((state) => state.ingredients);

  // const orderIngredients = data.ingredients.map((ingredientId) => {
  //   const ingredientDetails = list.find((item) => item._id === ingredientId);
  //   return { ...ingredientDetails };
  // });
  // // const sum = useMemo(
  // //   () => orderIngredients.reduce((acc, { price }) => acc + price, 0),
  // //   [orderIngredients]
  // // );
  // const sum = useMemo(
  //   () =>
  //     orderIngredients?.reduce((acc, cur) => {
  //       const price = cur.price ?? 0;
  //       // console.log(price);
  //       return acc + price;
  //     }, 0),
  //   [orderIngredients]
  // );
  const { orderIngredients, sum } = useOrderIngredients(data);

  // const { orderIngredients, sum } = useOrderIngredients();
  if (!orderIngredients) {
    return null;
  }

  //console.log(orderIngredients);
  return (
    <li className={styles.cardContainer}>
      <NavLink
        className={styles.card}
        to={`${data.number}`}
        // state={{ background: location }}
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
        {/* {console.log("navParams", navParams)}
        {console.log("navParams.id", navParams.id)}
        */}
      </NavLink>
      {/* {navParams && navParams.id && (
        <Modal title="" onClose={() => navigate("/feed")}>
          <FeedId />
        </Modal>
      )} */}
    </li>
  );
};

export default OrderCard;
