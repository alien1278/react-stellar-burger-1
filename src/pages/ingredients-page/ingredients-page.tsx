import React, { FC } from "react";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useAppSelector } from "../../services/hook";
import style from "./ingredients-page.module.css";
type TParams = {
  id: string;
};
const IngredientsPage: FC = () => {
  const isListLoaded = useAppSelector((st) => st.ingredients.list.length > 0);
  const navParams = useParams<TParams>();

  return (
    <>
      {isListLoaded && (
        <div className={`${style.content} mt-30`}>
          <p className="text text_type_main-large p-2">Детали ингредиента</p>

          <IngredientDetails id={navParams.id as string} />
        </div>
      )}
    </>
  );
};

export default IngredientsPage;
