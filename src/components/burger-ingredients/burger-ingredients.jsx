import React, { useEffect, useState, useMemo, useRef } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import BurgerIngredientsList from "../burger-ingridients-list/burger-ingridients-list";
import { useSelector } from "react-redux";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");

  const ingredientsData = useSelector((store) => store.ingredients.list);

  const bun = React.useMemo(
    () => ingredientsData.filter((elem) => elem.type === "bun"),
    [ingredientsData]
  );
  const main = React.useMemo(
    () => ingredientsData.filter((elem) => elem.type === "main"),
    [ingredientsData]
  );
  const sauce = React.useMemo(
    () => ingredientsData.filter((elem) => elem.type === "sauce"),
    [ingredientsData]
  );

  const bunRef = useRef();
  const mainRef = useRef();
  const sauceRef = useRef();

  const scrollInto = (name) => {
    if (name === "sauce") {
      sauceRef.current.scrollIntoView();
    } else if (name === "bun") {
      bunRef.current.scrollIntoView();
    } else {
      mainRef.current.scrollIntoView();
    }
  };

  return (
    <div className={`${style.burger_container} mt-10`}>
      <p className="text text_type_main-medium mb-5">Coберите бургер</p>
      <div className={`${style.tab} `}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => scrollInto("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => scrollInto("main")}
        >
          Начинки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => scrollInto("sauce")}
        >
          Соусы
        </Tab>
      </div>
      <div
        className={`${style.ingredients}`}
        onScroll={(e) => {
          if (
            e.target.scrollTop <
            mainRef.current.offsetTop - e.target.offsetTop
          ) {
            setCurrent("bun");
          } else if (
            e.target.scrollTop >
            sauceRef.current.offsetTop - e.target.offsetTop - 200
          ) {
            setCurrent("sauce");
          } else {
            setCurrent("main");
          }

          console.log(e.target.scrollTop);
          console.log(
            e.target.scrollTop,
            bunRef.current.offsetTop - e.target.offsetTop,
            mainRef.current.offsetTop - e.target.offsetTop,
            sauceRef.current.offsetTop - e.target.offsetTop
          );
        }}
      >
        <BurgerIngredientsList ingredients={bun} title="Булки" elRef={bunRef} />
        <BurgerIngredientsList
          ingredients={main}
          title="Начинки"
          elRef={mainRef}
        />
        <BurgerIngredientsList
          ingredients={sauce}
          title="Соусы"
          elRef={sauceRef}
        />
      </div>
    </div>
  );
}

export default BurgerIngredients;
