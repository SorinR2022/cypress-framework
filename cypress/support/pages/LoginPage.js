class LoginPage {
  get usernameInput() { return cy.get('[data-test="username"]'); }
  get passwordInput() { return cy.get('[data-test="password"]'); }
  get loginButton()   { return cy.get('[data-test="login-button"]'); }
  get errorMessage()  { return cy.get('[data-test="error"]'); }

  visit() {
    cy.visit('/');
  }

  login(username, password) {
    this.usernameInput.should('be.visible').clear().type(username);
    this.passwordInput.should('be.visible').clear().type(password);
    this.loginButton.click();
  }

  assertErrorVisible(expectedText) {
    this.errorMessage.should('be.visible').and('contain.text', expectedText);
  }
}

module.exports = new LoginPage();