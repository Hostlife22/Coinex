import { BASE_URL_CRYPTO } from '../../src/common/constants';
import { aliasQuery } from '../../src/common/utils/graphql-test-utils';

describe('tests the home screen', () => {
  it('should check for the presence of all components on the page', () => {
    cy.visit('/');
    cy.get('[data-testid="header"]').should('exist');
    cy.get('[data-testid="sidebar"]').should('exist');
    cy.get('[data-testid="home"]').should('exist');
  });

  it('should check the list of cryptocurrencies when loading the page', () => {
    cy.visit('/');
    cy.get('[data-testid="table"] tbody tr').should('not.exist');
  });

  it('should check the opening and closing of sidebar', () => {
    cy.visit('/');
    cy.get('[data-testid="header"]').should('exist');
    cy.get('[data-testid="toggle"]').should('exist');
    cy.get('[data-testid="toggle"]').click({ force: true });
    cy.get('[data-testid="logo-title"]').should('not.be.visible');
    cy.get('[data-testid="toggle"]').click({ force: true });
    cy.get('[data-testid="logo-title"]').should('be.visible');
  });

  context('Receiving data with Graphql', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.intercept('POST', BASE_URL_CRYPTO, (req) => {
        aliasQuery(req, 'getCryptos');
      });
    });

    it('should check the list of cryptocurrencies when loaded the page', () => {
      cy.wait('@gqlgetCryptosQuery');
      cy.get('[data-testid="table"] tbody tr').should('have.length', 10);
    });

    it('should get an array with data in the amount of 100 objects', () => {
      cy.wait('@gqlgetCryptosQuery').its('response.body.data.assets').should('have.length', 100);
    });

    it('cryptocurrency TRX should be found ', () => {
      cy.wait('@gqlgetCryptosQuery');
      cy.get('[data-testid="search-input"]').type('trx');
      cy.get('[data-testid="table"] tbody tr').should('have.length', 1);
    });

    it('should be the picture when cryptocurrency was not found', () => {
      cy.wait('@gqlgetCryptosQuery');
      cy.get('[data-testid="search-input"]').type('fake-token');
      cy.get('[data-testid="table"] tbody tr').should('not.exist');
      cy.get('[data-testid="img-no-results"]').should('exist');
    });
  });
});
