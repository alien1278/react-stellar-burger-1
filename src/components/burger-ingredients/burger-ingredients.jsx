import React, { useEffect, useState,useMemo } from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import BurgerIngredientsList from '../burger-ingridients-list/burger-ingridients-list';
import PropTypes from 'prop-types';

 function BurgerIngredients({ingredientsData,clickIngredient,onClick}) {
  const [current, setCurrent] = React.useState('bun')
 
  const bun = React.useMemo(() => ingredientsData.filter(elem => elem.type === 'bun'), [ingredientsData]);
  const main = React.useMemo(() => ingredientsData.filter(elem => elem.type === 'main'), [ingredientsData]);
  const sauce = React.useMemo(() => ingredientsData.filter(elem => elem.type === 'sauce'), [ingredientsData]);

  return (
    <div className={`${style.burger_container} mt-10`}>
      <p className="text text_type_main-medium mb-5">Coберите бургер</p>
      <div className={`${style.tab } `} >
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${style.ingredients}`}>
               <BurgerIngredientsList ingredients={bun} title='Булки' clickIngredient={clickIngredient} onClick={onClick}  />
               <BurgerIngredientsList ingredients={main} title='Начинки' clickIngredient={clickIngredient} onClick={onClick}/>
               <BurgerIngredientsList ingredients={sauce} title='Соусы' clickIngredient={clickIngredient} onClick={onClick}/>
      </div>   
  </div>
  );
};

BurgerIngredients.propTypes = {
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
  onClick: PropTypes.func.isRequired,
  clickIngredient: PropTypes.func.isRequired,
};

export default BurgerIngredients;