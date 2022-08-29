import { v4 } from 'uuid';

describe('tests the register screen', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should check for the presence of all components on the page', () => {
    cy.get('[data-testid="registration"]').should('exist');
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
    cy.visit('/register');
    cy.url().should('include', '/register');
    cy.url().should('eq', 'http://localhost:3000/register');
  });

  it('should check the transition from the registration page for authorization and vice versa', () => {
    cy.get('[data-testid="register-link"]').click();
    cy.url().should('include', '/auth');
    cy.url().should('eq', 'http://localhost:3000/auth');
    cy.get('[data-testid="auth-link"]').click();
    cy.url().should('include', '/register');
    cy.url().should('eq', 'http://localhost:3000/register');
  });

  it.skip('should check the registration of the new user', () => {
    const uniqEmail = `bob.${v4().slice(0, 10)}@gmail.com`;
    cy.get('[data-testid="register-firstName"]').type('Bob');
    cy.get('[data-testid="register-lastName"]').type('Marley');
    cy.get('[data-testid="register-email"]').type(uniqEmail);
    cy.get('[data-testid="register-phone"]').type('575294401137');
    cy.get('[data-testid="register-password"]').type('password');
    cy.get('[data-testid="register-confirmPassword"]').type('password');

    cy.get('[data-testid="register-submit"]').click();
  });
});
