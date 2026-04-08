const selectors = require("../fixtures/selectors.json");

describe("Главная страница", () => {
  beforeEach(() => {
    cy.visit("http://qamid.tmweb.ru");
  });

  it("Should show correct number of days", () => {
    cy.get(selectors.mainPage.dayTab).should("have.length", 7);
  });
});