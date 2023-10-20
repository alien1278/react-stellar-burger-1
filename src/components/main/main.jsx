import React, { useState } from "react";
import style from "./main.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import OrderDetails from "../order-details/order-details.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../services/modalSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../modal/modal.jsx";
import {
  Route,
  Routes,
  useLocation,
  useMatches,
  useNavigate,
  useParams,
} from "react-router-dom";

function Main() {
  const modalState = useSelector((store) => store.modal);

  const dispatch = useDispatch();

  const navParams = useParams();
  const navigate = useNavigate();

  const isListLoaded = useSelector((st) => st.ingredients.list.length > 0);

  return (
    <main className={style.main}>
      <section className={style.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        {modalState.name === "order" && (
          <Modal title="" onClose={() => dispatch(hideModal())}>
            <OrderDetails />
          </Modal>
        )}
        {isListLoaded && navParams && navParams.id && (
          <Modal title="Детали ингредиента" onClose={() => navigate("/")}>
            <IngredientDetails id={navParams.id} />
          </Modal>
        )}
      </section>
    </main>
  );
}

export default Main;
