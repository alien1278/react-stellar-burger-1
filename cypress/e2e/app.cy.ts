/// <reference types="cypress" />
const testUrl = "http://localhost:3000/react-stellar-burger-1";
const ingredientSelector = '[data-cy="ingridient"]'; // Селектор для ингредиентов
const constructorSelector = '[data-cy="constructor"]'; // Селектор для конструктора
const constructorElementSelector = '[data-cy="constructor-el"]'; // Селектор для элемента в конструкторе
const createButtonSelector = '[data-cy="button-create"]'; // Селектор для кнопки создания заказа

describe("should order works successfylly", () => {
  before(() => {
    cy.visit(testUrl);
  });

  it("should open the modal", () => {
    cy.viewport(1920, 1080);

    // Просмотр инфо об ингридиенте
    cy.get(ingredientSelector).contains("Краторная булка N-200i").click();

    cy.get('[data-cy="button-close"]').click();

    // Перетаскивание в конструктор
    cy.get(ingredientSelector)
      .contains("Краторная булка N-200i")
      .trigger("dragstart");

    cy.get(constructorSelector).trigger("drop");
    cy.get(ingredientSelector)
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");

    cy.get(constructorSelector).trigger("drop");
    cy.get(ingredientSelector)
      .contains("Филе Люминесцентного тетраодонтимформа")
      .trigger("dragstart");

    cy.get(constructorSelector).trigger("drop");
    cy.get(ingredientSelector)
      .contains("Говяжий метеорит (отбивная)")
      .trigger("dragstart");

    cy.get(constructorSelector).trigger("drop");

    // Удостовериться что ингриденты на нужных позициях
    cy.get(constructorElementSelector)
      .first()
      .contains("Биокотлета из марсианской Магнолии");
    cy.get(constructorElementSelector)
      .last()
      .contains("Говяжий метеорит (отбивная)");

    // Сортировка
    cy.get(constructorElementSelector)
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");

    const el = () =>
      cy
        .get(constructorElementSelector)
        .contains("Говяжий метеорит (отбивная)");

    el().trigger("dragenter");
    el().trigger("dragover");
    el().trigger("drop");

    cy.get(constructorElementSelector)
      .first()
      .contains("Филе Люминесцентного тетраодонтимформа");
    cy.get(constructorElementSelector)
      .last()
      .contains("Биокотлета из марсианской Магнолии");

    // Удаление

    cy.get('[data-cy="constructor-el"] .constructor-element__action')
      .last()
      .click();

    cy.get(constructorElementSelector)
      .last()
      .contains("Говяжий метеорит (отбивная)");

    // Оформления заказа — логин
    cy.get(createButtonSelector).click();
    const user = "alienalienalien1278@gmail.com";
    const password = "alienalien";
    // rdfrdfhtkm1278
    cy.get(".input_type_email input").type(user);
    cy.get(".input_type_password input").type(password);
    cy.get("button").contains("Войти").click();
    cy.get(createButtonSelector).click();

    // Оформления заказа — модалка что заказ начал готовиться

    // Обычно заказ появляется через 15сек, для надежности таймаут 20сек
    cy.get("#modalRoot").contains("Ваш заказ начали готовить", {
      timeout: 20000,
    });
    cy.get('[data-cy="button-close"').click();
  });
});
