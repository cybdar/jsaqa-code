const selectors = require("../fixtures/selectors.json");
const seats = require("../fixtures/seats.json");

describe("Бронирование фильма", () => {
  let movieName = "";

  before(() => {
    cy.visit("http://qamid.tmweb.ru/admin");
    cy.get(selectors.adminLogin.loginInput).type("qamid@qamid.ru");
    cy.get(selectors.adminLogin.passwordInput).type("qamid");
    cy.get(selectors.adminLogin.submitButton).click();
    cy.get(".conf-step__movie-title").first().invoke("text").then((text) => {
      movieName = text.trim();
    });
  });

  it("Should be possible to book", () => {
    cy.visit("http://qamid.tmweb.ru");
    cy.get(selectors.mainPage.dayTab).eq(3).click();
    cy.contains(selectors.mainPage.movieCard, movieName)
      .find(selectors.mainPage.movieTimeButton)
      .first()
      .click();
    seats.forEach((seat) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
      ).click();
    });
    cy.get(selectors.mainPage.acceptButton).click();
    cy.contains("Вы выбрали билеты:").should("be.visible");
  });
});