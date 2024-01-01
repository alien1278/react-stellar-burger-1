import style from "./not-found-404.module.css";
import React, { FC} from "react";

import { Link } from "react-router-dom";

const NotFound404: FC = () => {
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
