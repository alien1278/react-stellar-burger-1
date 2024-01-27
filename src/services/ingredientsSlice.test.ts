import {
  newIngredientsSliceReducer,
  getIngredientRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  sortConstructorIngredients,
  deleteIngredient,
  clearIngredients,
  addIngredient,
  initialState,
} from "./ingredientsSlice";
const testIngredient1 = {
  _id: "1",
  name: "Тестовый ингредиент",
  type: "type1",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: "",
};

const testIngredient2 = {
  _id: "2",
  name: "Тестовый ингредиент 2",
  type: "type2",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: "",
};
describe("newIngredientsSlice reducer", () => {
  // Тест на начальное состояние редьюсера
  it("должен обрабатывать начальное состояние", () => {
    expect(newIngredientsSliceReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  // Тесты для каждого действия
  it("должен обрабатывать getIngredientRequest", () => {
    expect(
      newIngredientsSliceReducer(initialState, getIngredientRequest())
    ).toEqual({
      ...initialState,
      ingredientsRequest: true,
    });
  });

  it("должен обрабатывать getIngredientsSuccess", () => {
    const testIngredients = [testIngredient1];
    expect(
      newIngredientsSliceReducer(
        initialState,
        getIngredientsSuccess(testIngredients)
      )
    ).toEqual({
      ...initialState,
      list: testIngredients,
      ingredientsFailed: false,
      ingredientsRequest: false,
    });
  });

  it("должен обрабатывать getIngredientsFailed", () => {
    expect(
      newIngredientsSliceReducer(initialState, getIngredientsFailed())
    ).toEqual({
      ...initialState,
      ingredientsFailed: true,
      ingredientsRequest: true,
    });
  });
  // Продолжение тестов для newIngredientsSlice reducer
  it("должен обрабатывать sortConstructorIngredients", () => {
    const startState = {
      ...initialState,
      chosenIngredients: [testIngredient1, testIngredient2],
    };
    const dragIndex = 0;
    const hoverIndex = 1;
    const action = sortConstructorIngredients({ dragIndex, hoverIndex });

    // Вызываем редьюсер с начальным состоянием и действием
    const updatedState = newIngredientsSliceReducer(startState, action);

    // Ожидаем, что ингредиенты поменяются местами
    const expectedState = {
      ...startState,
      chosenIngredients: [
        startState.chosenIngredients[hoverIndex], // Ингредиент, на который перемещаем
        startState.chosenIngredients[dragIndex], // Перемещаемый ингредиент
      ],
    };

    expect(updatedState).toEqual(expectedState);
  });

  it("должен обрабатывать deleteIngredient", () => {
    const startState = {
      ...initialState,
      chosenIngredients: [testIngredient1, testIngredient2],
    };
    const deleteIndex = 0;
    expect(
      newIngredientsSliceReducer(startState, deleteIngredient(deleteIndex))
    ).toEqual({
      ...startState,
      chosenIngredients: [testIngredient2],
    });
  });

  it("должен обрабатывать clearIngredients", () => {
    const startState = {
      ...initialState,
      chosenIngredients: [testIngredient1],
    };
    expect(newIngredientsSliceReducer(startState, clearIngredients())).toEqual({
      ...startState,
      chosenIngredients: [],
    });
  });

  it("должен обрабатывать addIngredient", () => {
    const startState = {
      ...initialState,
      list: [testIngredient1, testIngredient2],
    };
    const ingredientToAdd = { id: "2", uuid: "123" };
    expect(
      newIngredientsSliceReducer(startState, addIngredient(ingredientToAdd))
    ).toEqual({
      ...startState,
      chosenIngredients: [
        ...startState.chosenIngredients,
        { ...testIngredient2, uuid: "123" },
      ],
    });
  });
});
