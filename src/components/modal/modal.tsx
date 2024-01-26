import React, { useEffect, FC } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./modal.module.css";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import { IModalProps } from "../../utils/types";

const modalRoot = document.getElementById("modalRoot");

const Modal: FC<IModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onClose]);
  if (!modalRoot) {
    console.error("Modal root not found");
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <div className={`${style.modal} pl-10 pr-10`}>
        <div className={style.header}>
          <p className="text text_type_main-large mt-15">{title}</p>
          <button
            className={`${style.button} mt-15`}
            onClick={onClose}
            data-cy="button-close"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={`${style.content} mr-15 ml-15`}>{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};
Modal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
