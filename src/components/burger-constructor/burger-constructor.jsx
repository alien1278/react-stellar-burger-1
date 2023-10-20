import React, { useMemo } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { addIngredient } from "../../services/ingredientsSlice";
import ConstructorElements from "../constructor-elements/constructor-elements";
import { showModal } from "../../services/modalSlice";
import { sendOrder } from "../../services/actions/order";
import { useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { chosenIngredients } = useSelector((state) => state.ingredients);
  const { userInfo } = useSelector((state) => state.users);
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      dispatch(addIngredient({ id: item._id }));
    },
  });
  const sum = useMemo(
    () =>
      chosenIngredients.reduce(
        (acc, cur) =>
          cur.type === "bun" ? acc + cur.price * 2 : acc + cur.price,
        0
      ),
    [chosenIngredients]
  );
  const bunHandler = (chosenIngredients, property, trueValue, falseValue) =>
    chosenIngredients.find((ingredient) => ingredient.type === "bun")
      ? `${
          chosenIngredients.find((ingredient) => ingredient.type === "bun")[
            property
          ]
        } ${trueValue}`
      : falseValue;

  const isBun =
    chosenIngredients.find((ingredient) => ingredient.type === "bun") !==
    undefined;
  const openOrderDetails = async () => {
    const ingredientsId = chosenIngredients.map((ingredient) => ingredient._id);
    if (userInfo) {
      await dispatch(sendOrder(ingredientsId));
      dispatch(showModal({ name: "order" }));
    } else {
      await navigate("/login");
    }
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`${style.content} mt-25 ml-4 mr-4`} ref={dropRef}>
        <div className={`${style.constructor} `}>
          <div className={`${style.topElement} ml-8 mr-4`}>
            {isBun && (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={bunHandler(
                  chosenIngredients,
                  "name",
                  "(верх)",
                  "Выберите булку"
                )}
                price={bunHandler(chosenIngredients, "price", "", "0")}
                thumbnail={bunHandler(chosenIngredients, "image", "", "")}
              />
            )}
          </div>
          <div className={`${style.elements} mt-4 mb-4 `}>
            {chosenIngredients.map(
              (item, index) =>
                item.type !== "bun" && (
                  <ConstructorElements
                    key={item.uuid}
                    index={index}
                    ingredient={item}
                    id={`${item._id}${index}`}
                  />
                )
            )}
          </div>
          <div className={`${style.bottomElement} ml-8 mr-4`}>
            {isBun && (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bunHandler(
                  chosenIngredients,
                  "name",
                  "(низ)",
                  "Выберите булку"
                )}
                price={bunHandler(chosenIngredients, "price", "", "0")}
                thumbnail={bunHandler(chosenIngredients, "image", "", "")}
              />
            )}
          </div>
        </div>
        <div className={`${style.info} mt-10 mb-10 mr-4`}>
          <div className={`${style.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{sum}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="medium"
            onClick={openOrderDetails}
            htmlType="submit"
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </DndProvider>
  );
}

export default BurgerConstructor;
