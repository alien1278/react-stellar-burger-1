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

function Main() {
  const modalState = useSelector((store) => store.modal);

  const dispatch = useDispatch();

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
        {modalState.name === "details" && (
          <Modal
            title="Детали ингредиента"
            onClose={() => dispatch(hideModal())}
          >
            <IngredientDetails />
          </Modal>
        )}
      </section>
    </main>
  );
}

export default Main;
