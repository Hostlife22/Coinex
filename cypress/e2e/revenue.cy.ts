import { BASE_URL } from '../../src/common/constants';
import { IUser } from '../support/interface';
import { deposit, loginUser } from './utils';

describe('tests the revenue screen', () => {
  Cypress.Cookies.defaults({
    preserve: 'signin',
  });

  context('authorization of the user', () => {
    before(() => {
      cy.fixture('userData.json').then((user: IUser) => {
        loginUser(user.email, user.password);
      });
    });

    beforeEach(() => {
      cy.intercept('POST', BASE_URL + '/signin').as('signin');
    });

    it('checked for the addition of cryptocurrency', () => {
      cy.wait('@signin');
      cy.visit('/wallet');
      deposit(2000);
      cy.visit('/');
      cy.get('.cryptocurrency__tr-1 > :nth-child(6) > .cryptocurrency__btn').click();
      cy.get('.crypto__add-portfolio').click();
      cy.get('.modal__input > input').type('100');
      cy.get('.modal__btn').click();
      cy.get('.modal__content').parent().click();
      cy.visit('/revenue');
    });

    it('should check for the presence of all components on the page', () => {
      cy.visit('/revenue');
      cy.get('.revenue__overview')
        .should('be.visible')
        .within(() => {
          cy.get('.revenue__date-range').should('exist');
          cy.get('.recharts-surface').should('exist');
          cy.get('.revenue__list').should('exist');
          cy.get('.revenue__overview-header').should('exist');
          cy.get('.revenue__bottom').should('exist');
        });
    });
  });
});
