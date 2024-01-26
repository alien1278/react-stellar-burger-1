import { useMemo } from "react";
import { useAppSelector } from "./../hook"; // Актуализируйте путь до вашего хука useAppSelector
import { IIngredient, TOrder } from "./../../utils/types"; // Актуализируйте путь до ваших типов
interface IIngredientWithCount extends IIngredient {
  count: number;
}
export const useOrderIngredients = (order?: TOrder) => {
  const { list } = useAppSelector((state) => state.ingredients);

  const orderIngredients = order?.ingredients
    .map((ingredientId) => {
      const ingredientDetails = list.find((item) => item._id === ingredientId);
      return ingredientDetails ?? null; // Возвращаем null, если ингредиент не найден
    })
    .filter((ingredient): ingredient is IIngredient => ingredient !== null);

  const sum = useMemo(
    () => orderIngredients?.reduce((acc, cur) => acc + (cur.price ?? 0), 0),
    [orderIngredients]
  );

  if (!order) {
    return { orderIngredients: [], sum: 0 };
  }
  const ingredientCountMap = orderIngredients?.reduce<
    Record<string, IIngredientWithCount>
  >((acc, ingredient) => {
    const id = ingredient._id; // Предполагаем, что у каждого ингредиента есть _id

    // Проверяем, есть ли уже ингредиент с таким _id в аккумуляторе
    if (acc[id]) {
      acc[id].count += 1; // Увеличиваем счетчик для этого ингредиента
    } else {
      // Если такого ингредиента нет, добавляем его в аккумулятор с начальным количеством 1
      acc[id] = { ...ingredient, count: 1 };
    }

    return acc; // Возвращаем обновленный аккумулятор
  }, {});
  if (!ingredientCountMap) {
    return { orderIngredients: [], sum: 0 };
  }
  // const uniqueOrderIngredients = Object.values(ingredientCounts);
  const uniqueOrderIngredients = Object.values(ingredientCountMap);
  return { orderIngredients, sum, uniqueOrderIngredients };
};
