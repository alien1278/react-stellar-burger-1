import React, { FC } from "react";
import style from "./ModalOverlay.module.css";
interface IModalOverlayProps {
  onClick: () => void;
}
const ModalOverlay: FC<IModalOverlayProps> = ({ onClick }) => {
  return <div className={style.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
