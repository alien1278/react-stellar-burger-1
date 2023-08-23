import React from "react";
import PropTypes from "prop-types";
import style from './ModalOverlay.module.css';

const ModalOverlay = ({ onClick }) => {
   return (
      <div className={style.overlay} onClick={onClick}></div>
   )
}

ModalOverlay.propTypes = {
   onClick: PropTypes.func.isRequired
}

export default ModalOverlay;