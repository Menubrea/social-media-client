describe('Social Media Client: Testing Create Post Form:', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/').wait(500);

    cy.get("form [data-auth='login']")
      .contains('Login')
      .should('not.be.hidden')
      .click()
      .wait(1000);

    cy.get("#loginForm input[type='email']")
      .should('not.be.hidden')
      .type(email, { delay: 100, force: true });

    cy.get("#loginForm input[type='password']")
      .should('not.be.hidden')
      .type(`${password}{enter}`, { delay: 100, force: true })
      .wait(500);

    cy.get("[id='footerActions'] a")
      .contains('New Post')
      .should('exist')
      .click({ force: true })
      .wait(1000);
  });

  it('CAN validate TITLE based on API restrictions', () => {
    // Title is a required string value - left empty to test validation.

    // Tags should be an optional array of strings.
    cy.get("form [name='tags']").should('exist').type('test, testing');

    // Media should be an optional fully formed URL
    cy.get("form [name='media']")
      .should('exist')
      .type('https://images.unsplash.com/photo-1453733190371-0a9bedd82893');

    // Body should be an optional string.
    cy.get("form [name='body']").should('exist').type('test');

    cy.get("[id='postForm'] button").contains('Publish').click().wait(1000);
  });

  it('CAN validate MEDIA based on API restrictions', () => {
    // Title is a required string value.
    cy.get("form [name='title']").should('exist').type('test');

    // Tags should be an optional array of strings.
    cy.get("form [name='tags']").should('exist').type('test, testing');

    // Media should be an optional fully formed URL
    cy.get("form [name='media']").should('exist').type('string'); // Invalid value

    // Body should be an optional string.
    cy.get("form [name='body']").should('exist').type('test');

    cy.get("[id='postForm'] button").contains('Publish').click();
  });
});
