import React from 'react';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import style from './burger-ingridients-list.module.css'
import PropTypes from 'prop-types';

const BurgerIngredientsList = ({ ingredients, title, clickIngredient, onClick }) => {

    return (
        <div>
            <p className='text text_type_main-medium mt-10'>{title}</p>
            <div className={style.colomn}>
            {
               ingredients.map((element) => {
                  return (
                     <BurgerIngredient ingredient={element} onClick={(elem) => onClick(clickIngredient(elem))} key={element._id} />
                  )
               })
            }
            </div>
        </div>
    )
}



BurgerIngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
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
  onClick: PropTypes.func.isRequired,
  clickIngredient: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default BurgerIngredientsList;