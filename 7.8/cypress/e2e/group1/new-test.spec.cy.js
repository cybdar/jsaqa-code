describe("Дополнительные тесты для группы 1", () => {
  it("Проверка заголовка страницы", () => {
    cy.visit("http://qamid.tmweb.ru");
    cy.title().should("include", "ИдёмВКино");
  });
});