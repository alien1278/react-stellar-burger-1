import React, { useEffect, useState, useMemo, useRef } from "react";
import { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-ingredients.module.css";
import BurgerIngredientsList from "../burger-ingridients-list/burger-ingridients-list";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../services/hook";
import { IIngredient } from "../../utils/types";


const BurgerIngredients: FC = () => {

  const [current, setCurrent] = useState<"bun" | "main" | "sauce">("bun");

  const ingredientsData = useAppSelector((store) => store.ingredients.list);

  const bun = React.useMemo(
    () => ingredientsData.filter((elem: IIngredient) => elem.type === "bun"),
    [ingredientsData]
  );
  const main = React.useMemo(
    () => ingredientsData.filter((elem:IIngredient) => elem.type === "main"),
    [ingredientsData]
  );
  const sauce = React.useMemo(
    () => ingredientsData.filter((elem: IIngredient) => elem.type === "sauce"),
    [ingredientsData]
  );

  const bunRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);

  const scrollInto = (name:string) => {
    if (name === "sauce" && sauceRef.current) {
      sauceRef.current.scrollIntoView();
    } else if (name === "bun" && bunRef.current) {
      bunRef.current.scrollIntoView();
    } else if (mainRef.current) {
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
          const target = e.target as HTMLElement;

    
        if (mainRef.current && target.scrollTop < mainRef.current.offsetTop - target.offsetTop) {
          setCurrent("bun");
      } else if (sauceRef.current && target.scrollTop > sauceRef.current.offsetTop - target.offsetTop - 200) {
          setCurrent("sauce");
      } else {
          setCurrent("main");
      }
        
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
