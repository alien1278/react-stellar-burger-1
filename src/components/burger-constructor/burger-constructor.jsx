import React from 'react';
import { DragIcon, ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor.module.css';
import PropTypes from 'prop-types';

 function BurgerConstructor({ingredientsData,onClick }) {

  return (
    <div className={`${style.content} mt-25 ml-4 mr-4`}><div className={`${style.constructor} `}>
        <div className={`${style.topElement} ml-8 mr-4`}>
          {ingredientsData[0] && <ConstructorElement
            type="top"
            isLocked={true}
            text={ingredientsData[0].name}
            price={ingredientsData[0].price}
            thumbnail={ingredientsData[0].image}/>}
        </div>
        <div className={`${style.elements} mt-4 mb-4 `}>
          {ingredientsData.filter(ingredient => ingredient.type !== 'bun').map((ingredient, i) => { 
            return (
              <div key={i}  className={`${style.element}`}>
                <DragIcon />
                <div className={style.constructorElement}>
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}/>
                </div>
              </div>
            )})
          }
        </div>
        <div className={`${style.bottomElement} ml-8 mr-4`}>
          {ingredientsData[0] &&<ConstructorElement
            type="bottom"
          isLocked={true}
          text={ingredientsData[0].name}
          price={ingredientsData[0].price}
          thumbnail={ingredientsData[0].image} />}</div>
        </div>
        <div className={`${style.info} mt-10 mb-10 mr-4`}>
          <div className={`${style.price} mr-10`}>
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="medium" onClick={onClick} htmlType="submit" >
            Оформить заказ
          </Button>
        </div>
    </div>
  );

};

BurgerConstructor.propTypes = {
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
};
export default  BurgerConstructor;
