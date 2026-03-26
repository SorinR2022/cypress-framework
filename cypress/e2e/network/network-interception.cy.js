
import { getReqresApiKey } from '../../support/commands/apiKey';

describe('Task 2 — Network Interception (ReqRes API)', () => {
  it('should intercept and validate the users API request', () => {
    const apiBaseUrl = 'https://reqres.in';
    const endpoint = '/api/users?page=2';
    const apiKey = getReqresApiKey();
    cy.intercept('GET', '**/api/users*').as('getUsers');
    cy.visit('/');
    cy.window().then(win => {
      win.fetch(`${apiBaseUrl}${endpoint}`, {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json'
        }
      });
    });
    cy.wait('@getUsers').then(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
      const { body } = response;
      expect(body).to.contain.all.keys('page', 'per_page', 'total', 'total_pages', 'data');
      expect(body.data).to.be.an('array').and.not.be.empty;
      body.data.forEach(user => {
        expect(user).to.include.all.keys('id', 'email', 'first_name', 'last_name', 'avatar');
        expect(user.email).to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
      });
      expect(request.headers).to.have.property('x-api-key', apiKey);
    });
  });
});