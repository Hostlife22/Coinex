import { IUser } from '../support/interface';
import { loginUser } from './utils';

describe('tests the authorization screen', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('should check for the presence of all components on the page', () => {
    cy.get('[data-testid="authorization"]').should('exist');
    cy.get('[data-testid="go-home"]').should('exist');
  });

  it('should be checked checkbox and label', () => {
    cy.get('[data-testid="checkbox-input"]').should('not.be.checked');
    cy.get('[data-testid="checkbox"] label > span').click();
    cy.get('[data-testid="checkbox-input"]').should('be.checked');
    cy.get('[data-testid="checkbox"] label').click();
    cy.get('[data-testid="checkbox-input"]').should('not.be.checked');
  });

  it('should check the home button', () => {
    cy.get('[data-testid="go-home"]').click();
    cy.url().should('eq', 'http://localhost:3000/');
    cy.visit('/auth');
    cy.url().should('include', '/auth');
    cy.url().should('eq', 'http://localhost:3000/auth');
  });

  it('should check the transition from the authorization page for registration and vice versa', () => {
    cy.get('[data-testid="auth-link"]').click();
    cy.url().should('include', '/register');
    cy.url().should('eq', 'http://localhost:3000/register');
    cy.get('[data-testid="register-link"]').click();
    cy.url().should('include', '/auth');
    cy.url().should('eq', 'http://localhost:3000/auth');
  });

  it(' should be checked authorization', () => {
    cy.fixture('userData.json').then((user: IUser) => {
      loginUser(user.email, user.password);
    });
  });
});
