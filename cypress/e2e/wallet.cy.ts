import { BASE_URL } from '../../src/common/constants';
import { IUser } from '../support/interface';
import { deposit, loginUser, withdraw } from './utils';

describe('tests the wallet screen', () => {
  Cypress.Cookies.defaults({
    preserve: 'signin',
  });

  context('Receiving data with Graphql', () => {
    before(() => {
      cy.fixture('userData.json').then((user: IUser) => {
        loginUser(user.email, user.password);
      });
    });

    beforeEach(() => {
      cy.intercept('POST', BASE_URL + '/signin').as('signin');
      cy.intercept('GET', '/statistics').as('statistics');
    });

    it('should check for the presence of all components on the page', () => {
      cy.wait('@signin');
      cy.visit('/wallet');
      cy.get('.wallet__title').contains('Wallet').should('exist');
      cy.get('.wallet__wrapper').should('exist');
      cy.get('[data-testid="deposit"]').should('exist');
      cy.get('[data-testid="withdraw"]').should('exist');
    });

    it('should check the replenishment', () => {
      deposit(2000);

      cy.get('[data-testid="deposit-cart"]').should('have.text', '$ 2K');
      cy.get('[data-testid="balance-cart"]').should('have.text', '$ 2K');
    });

    it(' check the withdrawal of the available amount', () => {
      withdraw(2000);
      cy.get('[data-testid="deposit-cart"]').should('have.text', '$ 2K');
      cy.get('[data-testid="withdraw-cart"]').should('have.text', '$ 2K');
      cy.get('[data-testid="balance-cart"]').should('have.text', '$ 0');
    });
  });
});
