describe('Social Media Client: Testing Create Post Form:', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/').wait(500);

    cy.get("form [data-auth='login']")
      .contains('Login')
      .should('not.be.hidden')
      .click()
      .wait(500);

    cy.get("[id='loginForm']");
    cy.get("[id='loginForm'] input[type='email']")
      .should('not.be.disabled')
      .type(`menubreacypress@noroff.no`, { delay: 100 });

    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`12345678{enter}`, { delay: 100 })
      .wait(500);

    cy.get("[id='footerActions'] a")
      .contains('New Post')
      .should('exist')
      .click({ force: true });
  });

  it('CAN validate TITLE based on API restrictions', () => {
    // Title is a required string value.
    cy.get("form [name='title']").should('exist'); // Left empty

    // Tags should be an optional array of strings.
    cy.get("form [name='tags']").should('exist').type('test, testing');

    // Media should be an optional fully formed URL
    cy.get("form [name='media']")
      .should('exist')
      .type(
        'https://images.unsplash.com/photo-1453733190371-0a9bedd82893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80'
      );

    // Body should be an optional string.
    cy.get("form [name='body']").should('exist').type('test');

    cy.get("[id='postForm'] button").contains('Publish').click().wait(500);
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
