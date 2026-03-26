class InventoryPage {
  get pageTitle() { return cy.get('[data-test="title"]'); }
  get inventoryItems() { return cy.get('.inventory_item'); }
  get cartBadge() { return cy.get('[data-test="shopping-cart-badge"]'); }
  get cartLink() { return cy.get('[data-test="shopping-cart-link"]'); }
  get firstAddToCartButton() { return cy.get('[data-test^="add-to-cart"]').first(); }

  assertOnInventoryPage() {
    this.pageTitle.should('have.text', 'Products');
  }

  addFirstProductToCart() {
    this.firstAddToCartButton.click();
  }

  assertCartBadgeCount(expected) {
    this.cartBadge.should('be.visible').and('have.text', String(expected));
  }

  goToCart() {
    this.cartLink.click();
  }
}

module.exports = new InventoryPage();