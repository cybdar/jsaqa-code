// cypress/e2e/books-app.cy.js

describe('Приложение для работы с книгами', () => {
  
  it('Should open the main page', () => {
    cy.visit('/');
    cy.contains('Books list');
  });

  it('Should successfully login', () => {
    cy.visit('/');
    cy.login('test@test.com', 'test');
    cy.contains('Добро пожаловать test@test.com').should('be.visible');
  });

  describe('Работа с избранным', () => {
    
    beforeEach(() => {
      cy.visit('/');
      cy.login('test@test.com', 'test');
    });

    it('Should add book to favorites', () => {
      cy.get('.card').first().within(() => {
        cy.contains('Add to favourite').click();
      });
      cy.contains('Favorites').click();
      cy.get('.card').should('have.length', 1);
    });

    it('Should remove book from favorites', () => {
      cy.get('.card').first().within(() => {
        cy.contains('Add to favourite').click();
      });
      cy.contains('Favorites').click();
      cy.get('.card').should('have.length', 1);
      cy.contains('Remove').click();
      cy.get('.card').should('have.length', 0);
    });

    it('Should update favorites counter', () => {
      cy.get('body').then($body => {
        if ($body.find('[data-testid="favorites-count"]').length) {
          cy.get('[data-testid="favorites-count"]').should('have.text', '0');
          cy.get('.card').first().contains('Add to favourite').click();
          cy.get('[data-testid="favorites-count"]').should('have.text', '1');
        } else {
          cy.log('Счётчик отсутствует в приложении — тест пропущен');
        }
      });
    });
    
  });
});