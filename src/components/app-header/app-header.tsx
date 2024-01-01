import React, { FC } from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import { NavLink } from "react-router-dom";

const AppHeader: FC = () => {
  return (
    <header className={`${style.header} text text_type_main-default`}>
      <nav className={`${style.nav} `}>
        <div className={`${style.list} `}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${style.link} p-5`
                : `${style.link_inactive} ${style.link} p-5`
            }
          >
            <BurgerIcon type="secondary" />
            <p className={style.text}>Конструктор</p>
          </NavLink>
          <NavLink
            to="/order"
            className={({ isActive }) =>
              isActive
                ? `${style.link} p-5`
                : `${style.link_inactive} ${style.link} p-5`
            }
          >
            <BurgerIcon type="secondary" />
            <p className={style.text}>Лента заказов</p>
          </NavLink>
        </div>
        <Logo />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? `${style.link} ` : `${style.link_inactive} ${style.link}`
          }
        >
          <ProfileIcon type="secondary" />
          <p className={style.text}>Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
