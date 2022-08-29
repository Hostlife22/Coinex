import { IUserRegister } from '../support/interface';

const { random } = Cypress._;

export const registerUser = ({ email, password, firstName, lastName, phone }: IUserRegister) => {
  const uniqEmail = email || `bob-${random(1e10)}@gmail.com`;
  const pass = password || `pass-${random(1e10)}`;
  const userFirstName = firstName || `user-${random(1e5)}`;
  const userLastName = lastName || `user-${random(1e5)}`;

  cy.get('.registration__form')
    .should('be.visible')
    .within(() => {
      cy.get('[data-testid="register-firstName"]').type(userFirstName);
      cy.get('[data-testid="register-lastName"]').type(userLastName);
      cy.get('[data-testid="register-email"]').type(uniqEmail);
      cy.get('[data-testid="register-phone"]').type(phone);
      cy.get('[data-testid="register-password"]').type(pass);
      cy.get('[data-testid="register-confirmPassword"]').type(pass);
      cy.get('[data-testid="register-submit"]').click();
    });
  cy.location('pathname').should('equal', '/auth');

  return cy.wrap({ email: uniqEmail, password: pass });
};

export function loginUser(email: string, password: string) {
  cy.clearCookie('signin');
  cy.visit('/auth');

  cy.get('.authorization__form')
    .should('be.visible')
    .within(() => {
      cy.get('[data-testid="auth-email"]').should('be.visible').type(email);
      cy.get('[data-testid="auth-password"]').should('be.visible').type(password);
      cy.get('[data-testid="auth-submit"]').click();
    });

  cy.location('pathname').should('equal', '/');
}
