

import { getReqresApiKey } from '../../support/commands/apiKey';
const API_BASE = 'https://reqres.in';
const API_KEY = getReqresApiKey();

describe('Task 3 — API: ReqRes Users', () => {
  let usersResponse;

  before(() => {
    cy.request({
      method: 'GET',
      url: `${API_BASE}/api/users?page=2`,
      headers: {
        Accept: 'application/json',
        'x-api-key': API_KEY,
      },
      failOnStatusCode: false,
    }).then((response) => {
      usersResponse = response;
    });
  });

  it('should return status code 200', () => {
    expect(usersResponse.status).to.equal(200);
  });

  it('should return a body with a data array', () => {
    expect(usersResponse.body).to.have.property('data');
    expect(usersResponse.body.data).to.be.an('array');
  });

  it('should have at least 1 user in the data array', () => {
    expect(usersResponse.body.data.length).to.be.greaterThan(0);
  });

  it('should return correct pagination envelope', () => {
    const body = usersResponse.body;
    expect(body).to.have.property('page', 2);
    expect(body).to.have.property('total');
    expect(body).to.have.property('total_pages');
  });

  it('should have correct structure for each user object', () => {
    usersResponse.body.data.forEach((user) => {
      expect(user).to.have.property('id').that.is.a('number');
      expect(user).to.have.property('email').that.is.a('string');
      expect(user).to.have.property('first_name').that.is.a('string');
      expect(user).to.have.property('last_name').that.is.a('string');
      expect(user).to.have.property('avatar').that.is.a('string');
    });
  });
});