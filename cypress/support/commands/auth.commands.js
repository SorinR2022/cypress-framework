
import LoginPage from '../pages/LoginPage';
import config from '../../config/local.json';

Cypress.Commands.add('loginWithUser', () => {
  LoginPage.visit();
  LoginPage.login(config.username, config.password);
  cy.get('body').then(($body) => {
    const okBtn = $body.find('button').filter((i, el) => /^(ok|confirm)$/i.test(el.innerText.trim()));
    if (okBtn.length > 0) {
      cy.wrap(okBtn).click({ force: true });
    }
  });
});