/// <reference types="cypress" />

describe("should order works successfylly", () => {
  before(() => {
    cy.visit("http://localhost:3000/react-stellar-burger-1");
  });

  it("should open the modal", () => {
    cy.viewport(1920, 1080);

    // Просмотр инфо об ингридиенте
    cy.get('[data-cy="ingridient"]').contains("Краторная булка N-200i").click();

    cy.get('[data-cy="button-close"]').click();

    // Перетаскивание в конструктор
    cy.get('[data-cy="ingridient"]')
      .contains("Краторная булка N-200i")
      .trigger("dragstart");

    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="ingridient"]')
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");

    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="ingridient"]')
      .contains("Филе Люминесцентного тетраодонтимформа")
      .trigger("dragstart");

    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="ingridient"]')
      .contains("Говяжий метеорит (отбивная)")
      .trigger("dragstart");

    cy.get('[data-cy="constructor"]').trigger("drop");

    // Удостовериться что ингриденты на нужных позициях
    cy.get('[data-cy="constructor-el"]')
      .first()
      .contains("Биокотлета из марсианской Магнолии");
    cy.get('[data-cy="constructor-el"]')
      .last()
      .contains("Говяжий метеорит (отбивная)");

    // Сортировка
    cy.get('[data-cy="constructor-el"]')
      .contains("Биокотлета из марсианской Магнолии")
      .trigger("dragstart");

    const el = () =>
      cy
        .get('[data-cy="constructor-el"]')
        .contains("Говяжий метеорит (отбивная)");

    el().trigger("dragenter");
    el().trigger("dragover");
    el().trigger("drop");

    cy.get('[data-cy="constructor-el"]')
      .first()
      .contains("Филе Люминесцентного тетраодонтимформа");
    cy.get('[data-cy="constructor-el"]')
      .last()
      .contains("Биокотлета из марсианской Магнолии");

    // Удаление

    cy.get('[data-cy="constructor-el"] .constructor-element__action')
      .last()
      .click();

    cy.get('[data-cy="constructor-el"]')
      .last()
      .contains("Говяжий метеорит (отбивная)");

    // Оформления заказа — логин
    cy.get('[data-cy="button-create"]').click();
    const user = "alienalienalien1278@gmail.com";
    const password = "alienalien";
    // rdfrdfhtkm1278
    cy.get(".input_type_email input").type(user);
    cy.get(".input_type_password input").type(password);
    cy.get("button").contains("Войти").click();
    cy.get('[data-cy="button-create"]').click();

    // Оформления заказа — модалка что заказ начал готовиться

    // Обычно заказ появляется через 15сек, для надежности таймаут 20сек
    cy.get("#modalRoot").contains("Ваш заказ начали готовить", {
      timeout: 20000,
    });
    cy.get('[data-cy="button-close"').click();
  });
});
