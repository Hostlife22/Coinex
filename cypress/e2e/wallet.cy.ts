import { IUser } from '../support/interface';
import { loginUser } from './utils';

describe('tests the wallet screen', () => {
  Cypress.Cookies.defaults({
    preserve: 'signin',
  });

  before(() => {
    cy.fixture('userData.json').then((user: IUser) => {
      loginUser(user.email, user.password);
    });
  });

  it(' should be able to login', () => {
    cy.visit('/wallet');
  });
});
