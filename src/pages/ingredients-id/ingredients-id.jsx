import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import style from "./ingredients-id.module.css";

const IngredientsId = () => {
  const isListLoaded = useSelector((st) => st.ingredients.list.length > 0);
  const navParams = useParams();

  return (
    <>
      {isListLoaded && (
        <div className={`${style.content} mt-30`}>
          <p className="text text_type_main-large p-2">Детали ингредиента</p>
          <IngredientDetails id={navParams.id} />
        </div>
      )}
    </>
  );
};

export default IngredientsId;
