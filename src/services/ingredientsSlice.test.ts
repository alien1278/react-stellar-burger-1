import {
  newIngredientsSliceReducer,
  getIngredientRequest,
  getIngredientsSuccess,
  getIngredientsFailed,
  sortConstructorIngredients,
  deleteIngredient,
  clearIngredients,
  addIngredient,
} from "./ingredientsSlice";

describe("newIngredientsSlice reducer", () => {
  const initialState = {
    list: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    chosenIngredients: [],
  };

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
    const testIngredients = [
      {
        _id: "1",
        name: "Тестовый ингредиент",
        type: "type1",
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: "",
      },
    ];
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
      chosenIngredients: [
        {
          _id: "1",
          name: "Тестовый ингредиент",
          type: "type1",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
        {
          _id: "2",
          name: "Тестовый ингредиент 2",
          type: "type2",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
      ],
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
      chosenIngredients: [
        {
          _id: "1",
          name: "Тестовый ингредиент",
          type: "type1",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
        {
          _id: "2",
          name: "Тестовый ингредиент 2",
          type: "type2",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
      ],
    };
    const deleteIndex = 0;
    expect(
      newIngredientsSliceReducer(startState, deleteIngredient(deleteIndex))
    ).toEqual({
      ...startState,
      chosenIngredients: [
        {
          _id: "2",
          name: "Тестовый ингредиент 2",
          type: "type2",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
      ],
    });
  });

  it("должен обрабатывать clearIngredients", () => {
    const startState = {
      ...initialState,
      chosenIngredients: [
        {
          _id: "1",
          name: "Тестовый ингредиент",
          type: "type1",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
      ],
    };
    expect(newIngredientsSliceReducer(startState, clearIngredients())).toEqual({
      ...startState,
      chosenIngredients: [],
    });
  });

  it("должен обрабатывать addIngredient", () => {
    const startState = {
      ...initialState,
      list: [
        {
          _id: "1",
          name: "Тестовый ингредиент",
          type: "type1",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
        {
          _id: "2",
          name: "Тестовый ингредиент 2",
          type: "type2",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
        },
      ],
    };
    const ingredientToAdd = { id: "2" };
    expect(
      newIngredientsSliceReducer(startState, addIngredient(ingredientToAdd))
    ).toEqual({
      ...startState,
      chosenIngredients: [
        ...startState.chosenIngredients,
        {
          _id: "2",
          name: "Тестовый ингредиент 2",
          type: "type2",
          proteins: 0,
          fat: 0,
          carbohydrates: 0,
          calories: 0,
          price: 0,
          image: "",
          uuid: expect.any(String),
        },
      ],
    });
  });
});
