import React from "react";
import style from './OrderDetails.module.css';
import image from '../../images/done.svg'

const OrderDetails = () => {
   return (
      <div className={`${style.modal}`}>
         <p className="text text_type_digits-large mb-8 ">034536</p>
         <p className="text text_type_main-default">
            Индификатор заказа
         </p>
         <img src={image} alt="" className={`${style.image} m-15`} />
         <p className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
         </p>
         <p className={`${style.text} text text_type_main-default mb-30`}>
            Дождитесь готовности на орбитальной станции
         </p>
      </div>
   )
}

export default OrderDetails;