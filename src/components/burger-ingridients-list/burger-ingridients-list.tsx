import { FC, RefObject } from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import style from "./burger-ingridients-list.module.css";

import { IIngredient } from "../../utils/types";

type TBurgerIngredientsListProps = {
  ingredients: IIngredient[];
  title: string;
  elRef?: RefObject<HTMLDivElement>;
};

const BurgerIngredientsList: FC<TBurgerIngredientsListProps> = ({
  ingredients,
  title,
  elRef,
}) => {
  return (
    <div ref={elRef}>
      <p className="text text_type_main-medium mt-10">{title}</p>
      <div className={style.colomn}>
        {ingredients.map((element) => {
          return (
            <BurgerIngredient
              ingredient={element}
              key={element._id}
              data-cy="ingredient"
            />
          );
        })}
      </div>
    </div>
  );
};

export default BurgerIngredientsList;
