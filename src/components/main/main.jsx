import React, {useState} from 'react';
import style from './main.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/Modal.jsx';
import OrderDetails from '../order-details/OrderDetails.jsx';
import IngredientDetails from '../ingredient-details/IngredientDetails.jsx';
import PropTypes from 'prop-types';

function Main({ingredientsData}) {
  const [ingredientData, setIngredientData] = useState(null);
  const [currentlyOpenedModal, setCurrentlyOpenedModal] = useState(undefined);

  return (
    <main className={style.main}>
      <section className={style.container}>
        <BurgerIngredients ingredientsData={ingredientsData} clickIngredient={setIngredientData} onClick={() => setCurrentlyOpenedModal('details')} />
        <BurgerConstructor ingredientsData={ingredientsData} onClick={() => setCurrentlyOpenedModal('order')}/>
        {currentlyOpenedModal === 'order' &&
            <Modal title='' onClick={() => setCurrentlyOpenedModal(undefined)}>
               <OrderDetails />
            </Modal >
         }
          {currentlyOpenedModal === 'details' &&
            <Modal title='Детали ингредиента' onClick={() => setCurrentlyOpenedModal(undefined)}>
               <IngredientDetails ingredientData={ingredientData} />
            </Modal >
         }
      </section>
    </main>
  ); 
};

Main.propTypes = {
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

   }))
 };


export default  Main;