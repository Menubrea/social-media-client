describe('Social Media Client: Testing login functionality and form', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('index.html');
    cy.wait(600);
    cy.get('button').contains('Close').click({ force: true });
    cy.get("header [data-auth='login']").click({ force: true });
    cy.wait(600);
  });

  it('CAN successfully log in a valid user', () => {
    cy.get("[id='loginForm'] input[type='email']")
      .should('exist')
      .type(`menubreacypress@noroff.no`);
    cy.get("[id='loginForm'] input[type='password']")
      .should('exist')
      .type(`12345678{enter}`);
    cy.wait(600);
    cy.url().should('include', 'profile');
  });

  it('CAN successfully log out user', () => {
    cy.get("[id='loginForm'] input[type='email']")
      .should('exist')
      .type(`menubreacypress@noroff.no`);
    cy.get("[id='loginForm'] input[type='password']")
      .should('exist')
      .type(`12345678{enter}`);
    cy.wait(600);
    cy.get("header [data-auth='logout']").should('exist').click();
    cy.url().should('not.include', 'profile');
  });

  it('CAN validate user input based on API restrictions', () => {
    // The email value must be a valid stud.noroff.no or noroff.no email address.
    cy.get("[id='loginForm'] input[type='email']")
      .should('exist')
      .type(`cypress@test.no`);
    // The password value must be at least 8 characters.
    cy.get("[id='loginForm'] input[type='password']")
      .should('exist')
      .type(`123{enter}`);
    cy.wait(600);
  });
});
