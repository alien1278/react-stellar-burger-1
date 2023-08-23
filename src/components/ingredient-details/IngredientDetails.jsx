import React from "react";
import style from './IngredientDetails.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({ ingredientData }) => {
   const { name, proteins, fat, carbohydrates, calories, image } = ingredientData;

   return (
      <div className={style.modal}>
         <img src={image} alt="Изображение ингридиента" className={`${style.img} mb-4`} />
         <p className={`${style.name} text text_type_main-default mb-8`}>{name}</p>
         <ul className={`${style.elements} mb-15`}>
            <li className={`${style.element} `}>
               <p className="text text_type_main-default text_color_inactive">Каллорииб,ккал</p>
               <p className="text text_type_main-default text_color_inactive">{calories}</p>
            </li>
            <li className={`${style.element}`}>
               <p className="text text_type_main-default text_color_inactive">Белки,г</p>
               <p className="text text_type_main-default text_color_inactive">{proteins}</p>
            </li>
            <li className={`${style.element}`}>
               <p className="text text_type_main-default text_color_inactive">Жиры,г</p>
               <p className="text text_type_main-default text_color_inactive">{fat}</p>
            </li>
            <li className={`${style.element}`}>
               <p className="text text_type_main-default text_color_inactive">Углеводы,г</p>
               <p className="text text_type_main-default text_color_inactive">{carbohydrates}</p>
            </li>
         </ul>
      </div>
   )
}

IngredientDetails.propTypes = {
   ingredientsData: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,   
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat:PropTypes.number.isRequired,
      carbohydrates:PropTypes.number.isRequired,
      calories:PropTypes.number.isRequired,
      price:PropTypes.number.isRequired,
      image:PropTypes.string.isRequired,
 
   })),
 };
 

export default IngredientDetails;