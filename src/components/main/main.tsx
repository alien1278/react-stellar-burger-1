import React, { FC } from "react";
import style from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch } from "react-redux";
import { hideModal } from "../../services/modalSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../services/hook";

interface NavParams {
  id?: string;
}

const Main: FC = () => {
  // const modalState = useSelector((store) => store.modal);
  const modalState = useAppSelector((store) => store.modal.name);

  const dispatch = useDispatch();

  const navParams: NavParams = useParams();
  const navigate = useNavigate();

  const isListLoaded = useAppSelector((st) => st.ingredients.list.length > 0);

  return (
    <main className={style.main}>
      <section className={style.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        {modalState === "order" && (
          <Modal title="" onClose={() => dispatch(hideModal())}>
            <OrderDetails />
          </Modal>
        )}
        {console.log("navParams", navParams)}
        {console.log("navParams.id", navParams.id)}

        {isListLoaded && navParams && navParams.id && (
          <Modal title="Детали ингредиента" onClose={() => navigate("/")}>
            <IngredientDetails id={navParams.id} />
          </Modal>
        )}
      </section>
    </main>
  );
};

export default Main;
