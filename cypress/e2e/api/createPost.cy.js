describe('Social Media Client: Testing Create Post Form:', () => {
  beforeEach(() => {
    cy.visit('index.html');
    cy.clearLocalStorage();
    cy.wait(500);
    cy.get('button').contains('Close').click({ force: true });
    cy.get("header [data-auth='login']").click({ force: true });
    cy.wait(600);
    cy.get("[id='loginForm'] input[type='email']")
      .should('exist')
      .type(`menubreacypress@noroff.no`);
    cy.get("[id='loginForm'] input[type='password']")
      .should('exist')
      .type(`12345678{enter}`);
    cy.wait(500);
    cy.get("[id='footerActions'] a").contains('New Post').click();
  });

  it('CAN validate title based on API restrictions', () => {
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
    cy.get("[id='postForm'] button").contains('Publish').click();
  });

  it('CAN validate media based on API restrictions', () => {
    // Title is a required string value.
    cy.get("form [name='title']").should('exist').type('test');
    // Tags should be an optional array of strings.
    cy.get("form [name='tags']").should('exist').type('test, testing');
    // Media should be an optional fully formed URL
    cy.get("form [name='media']").should('exist').type('string'); // Invalid value
    // Body should be an optional string.
    cy.wait(500);
    cy.get("form [name='body']").should('exist').type('test');
    cy.get("[id='postForm'] button").contains('Publish').click();
  });
});
