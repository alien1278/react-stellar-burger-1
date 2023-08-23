
import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './app-header.module.css';



function AppHeader() {
    return (
      <header className={`${style.header} text text_type_main-default`} >
        <nav className={`${style.nav} `}>
          <div className={`${style.list} `}> 
              <a  className={`${style.link} p-5`} href='/' >
                <BurgerIcon type="primary"/>
                <p className={style.text} >Конструктор</p>
              </a>
              <a className={`${style.link} ${style.link_inactive} p-5`} href='/'>
                <ListIcon type="secondary"/>
                <p className={style.text}>Лента заказов</p>
              </a>
          </div>
          <Logo />
          <a className={`${style.link} ${style.link_inactive} `} href='/' >
            <ProfileIcon type="secondary" />
            <p className={style.text}>Личный кабинет</p>
          </a>
        </nav>
      </header >
    );
  }
  
  export default AppHeader;