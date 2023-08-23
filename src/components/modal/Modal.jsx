import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';

const modalRoot = document.getElementById("modalRoot");

function Modal({ title, onClick, children }) {

  useEffect(
      () => {
         const handleKeyPress = (e) => {
            e.key === 'Escape' && onClick()
         };

         document.addEventListener('keydown', handleKeyPress);
         return () => {
            document.removeEventListener('keydown', handleKeyPress)
         }
      }, [onClick]
   )

   return ReactDOM.createPortal(
      <>
         <div className={`${style.modal} pl-10 pr-10`}>
            <div className={style.header} >
               <p className="text text_type_main-large mt-15">
                    {title}
                </p>
               <button className={`${style.button} mt-15`} onClick={onClick}>
                  <CloseIcon type="primary" />
               </button>
            </div>
            <div className={`${style.content} mr-15 ml-15`}>
                {children}
            </div>
         </div>
         <ModalOverlay onClick={onClick} />
      </>,
      modalRoot
   );
}
Modal.propTypes = {
   children: PropTypes.element.isRequired,
   title: PropTypes.string.isRequired,
   onClick: PropTypes.func.isRequired,
 };

export default Modal;