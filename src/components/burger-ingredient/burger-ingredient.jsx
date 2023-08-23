import React, {useState} from 'react';
import style from './burger-ingredient.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerIngredient = ({ ingredient, onClick }) => {

    const { name, price, image } = ingredient;
    const [counter,setCounter ] = useState(false)

   
    return (
      
           <div className={`${style.item} `} onClick={() => onClick(ingredient)}>
              <img className={`pr-4 pl-4`} src={image} alt="" />
              <div className={`${style.price} mt-1`}>
                 <span className="text text_type_digits-default ">{price}</span>
                 <CurrencyIcon type="primary" />
              </div>
              <h3 className={`text text_type_main-default mt-1`}>{name}</h3>
              <div className={style.count}> 
              {counter && <Counter count={counter} size="default" />}
              </div>
           </div>
     )
}

BurgerIngredient.propTypes = {
   ingredientsData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,   
      price:PropTypes.number.isRequired,
      image:PropTypes.string.isRequired,
 
   })),
   onClick: PropTypes.func.isRequired,

 };
 
export default BurgerIngredient
