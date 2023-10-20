import React from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import style from "./burger-ingridients-list.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";

const BurgerIngredientsList = ({ ingredients, title, elRef }) => {
  return (
    <div ref={elRef}>
      <p className="text text_type_main-medium mt-10">{title}</p>
      <div className={style.colomn}>
        {ingredients.map((element) => {
          return <BurgerIngredient ingredient={element} key={element._id} />;
        })}
      </div>
    </div>
  );
};

BurgerIngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType),
  title: PropTypes.string.isRequired,
};

export default BurgerIngredientsList;
