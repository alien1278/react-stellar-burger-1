import React, { useMemo, FC } from "react";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  clearIngredients,
} from "../../services/ingredientsSlice";
import ConstructorElements from "../constructor-elements/constructor-elements";
import { showModal } from "../../services/modalSlice";
import { sendOrder } from "../../services/actions/order";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hook";
import { IIngredient } from "../../utils/types";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { chosenIngredients } = useAppSelector((state) => state.ingredients);
  const { userInfo } = useAppSelector((state) => state.users);
  //
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      dispatch(addIngredient({ id: item._id }));
    },
  });
  // console.log(chosenIngredients);
  const sum = useMemo(
    () => chosenIngredients.reduce((acc, cur) => acc + cur.price, 0),
    [chosenIngredients]
  );
  const bunHandler = (
    chosenIngredients: IIngredient[],
    property: keyof IIngredient,
    trueValue: string,
    falseValue: string
  ) => {
    const foundBun = chosenIngredients.find(
      (ingredient) => ingredient.type === "bun"
    );

    if (foundBun && property in foundBun) {
      return `${foundBun[property]} ${trueValue}`;
    }

    return falseValue;
  };

  const isBun =
    chosenIngredients.find((ingredient) => ingredient.type === "bun") !==
    undefined;
  const openOrderDetails = async () => {
    // const ingredientsId = chosenIngredients.map((ingredient) => ingredient._id);
    if (userInfo) {
      await dispatch(sendOrder(chosenIngredients));
      dispatch(showModal({ name: "order" }));
      dispatch(clearIngredients());
    } else {
      await navigate("/login");
    }
  };
  return (
    <div
      className={`${style.content} mt-25 ml-4 mr-4`}
      ref={dropRef}
      data-cy="constructor"
    >
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
              price={+bunHandler(chosenIngredients, "price", "", "0")}
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
              price={+bunHandler(chosenIngredients, "price", "", "0")}
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
          data-cy="button-create"
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

export default BurgerConstructor;
