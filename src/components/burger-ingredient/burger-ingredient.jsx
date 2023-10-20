import React, { useState } from "react";
import style from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../services/modalSlice";
import { useDrag } from "react-dnd";

const BurgerIngredient = ({ ingredient }) => {
  const { name, price, image, _id } = ingredient;

  const { chosenIngredients } = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();
  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: { _id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  let counter = 0;

  chosenIngredients.forEach(
    (ingredient) =>
      ingredient.name === name &&
      (ingredient.type === "bun" ? (counter += 2) : (counter += 1))
  );

  return (
    <div
      className={`${style.item}  ${isDrag}`}
      data-id={_id}
      ref={dragRef}
      onClick={() => {
        dispatch(showModal({ name: "details", data: { id: _id } }));
      }}
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
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredientsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default BurgerIngredient;
