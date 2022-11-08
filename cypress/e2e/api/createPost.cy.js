describe('Social Media Client: Testing Create Post-Form validation:', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
    cy.wait(500);

    cy.get("form [data-auth='login']")
      .contains('Login')
      .should('not.be.hidden')
      .click()
      .wait(850);

    cy.get("#loginForm input[type='email']").type(email, {
      delay: 100,
      force: true,
    });

    cy.get("#loginForm input[type='password']")
      .type(`${password}{enter}`, { delay: 100, force: true })
      .wait(500);

    cy.visit('/');
  });

  it('CAN reload', () => {
    cy.reload();
  });

  it('CAN validate TITLE based on API restrictions', () => {
    cy.get('#footerActions')
      .contains('New Post')
      .should('exist')
      .click()
      .wait(500);

    cy.url().should('include', 'post');
    // Title is a required string value - left empty to test validation.

    // Tags should be an optional array of strings.
    cy.get("[name='tags']").should('exist').type('test, testing');

    // Media should be an optional fully formed URL
    cy.get("[name='media']")
      .should('exist')
      .type('https://images.unsplash.com/photo-1453733190371-0a9bedd82893');

    // Body should be an optional string.
    cy.get("[name='body']").should('exist').type('test');

    cy.get('#postForm button').contains('Publish').click().wait(1000);

    cy.url().should('not.include', 'postID');
  });

  it('CAN validate MEDIA based on API restrictions', () => {
    cy.get('#footerActions')
      .contains('New Post')
      .should('exist')
      .click({ force: true })
      .wait(1000);

    cy.url().should('include', 'post');
    // Title is a required string value.
    cy.get("form [name='title']").should('exist').type('test');

    // Tags should be an optional array of strings.
    cy.get("form [name='tags']").should('exist').type('test, testing');

    // Media should be an optional fully formed URL
    cy.get("form [name='media']").should('exist').type('string'); // Invalid value

    // Body should be an optional string.
    cy.get("form [name='body']").should('exist').type('test');

    cy.get("[id='postForm'] button").contains('Publish').click();

    cy.url().should('not.include', 'postID');
  });
});
