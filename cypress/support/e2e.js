require('./commands/auth.commands');

Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('ResizeObserver') ||
    err.message.includes('Script error')
  ) {
    return false;
  }
});

beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});