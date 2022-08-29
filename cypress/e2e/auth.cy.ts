describe('tests the authorization screen', () => {
  beforeEach(() => {
    cy.visit('/auth');
  });

  it('should check for the presence of all components on the page', () => {
    cy.get('[data-testid="authorization"]').should('exist');
    cy.get('[data-testid="go-home"]').should('exist');
  });

  it('this is a test case', () => {
    cy.get('[data-testid="auth-email"]').type('example@gmail.com');
    cy.get('[data-testid="auth-password"]').type('password');
    cy.get('[data-testid="auth-submit"]').click();
  });
});
