import style from "./not-found-404.module.css";
import React from "react";
import { Link } from "react-router-dom";

const NotFound404 = () => {
  return (
    <>
      <div className={style.container}>
        <Link
          className={`${style.link} text text_type_main-medium mt-6'`}
          to="/"
        >
          На главную
        </Link>
      </div>
    </>
  );
};

export default NotFound404;
