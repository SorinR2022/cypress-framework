import LoginPage from '../../support/pages/LoginPage';
import InventoryPage from '../../support/pages/InventoryPage';

describe('Task 1 — UI Flow: Login and Add to Cart', () => {
  beforeEach(() => {
    cy.loginWithUser();
    cy.url().should('include', '/inventory.html');
  });

  it('should display the Products page after login', () => {
    InventoryPage.assertOnInventoryPage();
  });

  it('should add the first product to cart and show badge count of 1', () => {
    InventoryPage.assertOnInventoryPage();
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    InventoryPage.addFirstProductToCart();
    InventoryPage.assertCartBadgeCount(1);
  });

  it('should navigate to cart and show 1 item', () => {
    InventoryPage.addFirstProductToCart();
    InventoryPage.assertCartBadgeCount(1);
    InventoryPage.goToCart();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 1);
  });
});