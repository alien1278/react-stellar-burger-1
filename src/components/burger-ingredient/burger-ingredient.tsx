import React, { useState } from "react";
import { FC } from "react";
import style from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../services/modalSlice";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { IIngredient } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../services/hook";

interface IBurgerIngredientProps {
  ingredient: IIngredient;
}

const BurgerIngredient: FC<IBurgerIngredientProps> = ({ ingredient }) => {
  const { name, price, image, _id } = ingredient;

  const { chosenIngredients } = useAppSelector((state) => state.ingredients);

  const dispatch = useAppDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  let counter = 0;

  chosenIngredients.forEach(
    (currentIngredient: IIngredient) =>
      currentIngredient.name === name && (counter += 1)
  );

  return (
    <Link
      className={`${style.item}  ${isDrag}`}
      data-id={_id}
      ref={dragRef}
      to={"/ingredients/" + _id}
      state={{ showModal: true }}
    >
      <img className={`pr-4 pl-4`} src={image} alt="" />
      <div className={`${style.price} mt-1`}>
        <span className="text text_type_digits-default ">{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`text text_type_main-default mt-1`}>{name}</h3>
      <div className={style.count}>
        {counter > 0 && <Counter count={counter} size="default" />}
      </div>
    </Link>
  );
};

export default BurgerIngredient;
