const selectors = require("../../fixtures/selectors.json");
const users = require("../../fixtures/users.json");

describe("Логин в админку", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru/admin");
  });

  users.forEach((user) => {
    it(`Login with: ${user.login} (${user.type})`, () => {
      cy.get(selectors.adminLogin.loginInput).type(user.login);
      cy.get(selectors.adminLogin.passwordInput).type(user.password);
      cy.get(selectors.adminLogin.submitButton).click();

      if (user.expected === "success") {
        cy.contains("Администраторррская").should("be.visible");
      } else {
        cy.contains("Ошибка").should("be.visible");
      }
    });
  });
});