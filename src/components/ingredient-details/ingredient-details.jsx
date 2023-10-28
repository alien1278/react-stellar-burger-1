import React from "react";
import style from "./ingredient-details.module.css";

import { useSelector } from "react-redux";

const IngredientDetails = ({ id }) => {
  const { name, proteins, fat, carbohydrates, calories, image } = useSelector(
    (state) => {
      // const id = state.modal.data.id;

      return state.ingredients.list.find(({ _id }) => _id === id);
    }
  );

  return (
    <div className={style.modal}>
      <img src={image} alt={name} className={`${style.img} mb-4`} />
      <p className={`${style.name} text text_type_main-default mb-8`}>{name}</p>
      <ul className={`${style.elements} mb-15`}>
        <li className={`${style.element} `}>
          <p className="text text_type_main-default text_color_inactive">
            Каллории,ккал
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li className={`${style.element}`}>
          <p className="text text_type_main-default text_color_inactive">
            Белки,г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li className={`${style.element}`}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры,г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li className={`${style.element}`}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы,г
          </p>
          <p className="text text_type_main-default text_color_inactive">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
