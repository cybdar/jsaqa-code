describe("Дополнительные тесты для группы 2", () => {
  it("Проверка наличия формы логина", () => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
  });
});