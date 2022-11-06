describe('Social Media Client: Testing Client', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/').wait(500);

    cy.get("form [data-auth='login']")
      .contains('Login')
      .should('not.be.hidden')
      .click()
      .wait(850);
  });

  it('CAN reload', () => {
    cy.reload();
  });

  it('CAN successfully log in a valid user', () => {
    cy.get("form#loginForm input[type='email']")
      .should('not.be.disabled')
      .type(`menubreacypress@noroff.no`, { delay: 100 });

    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`12345678{enter}`, { delay: 100 })
      .wait(200);

    cy.url().should('include', 'profile');
  });

  it('CAN successfully log out user through logout button', () => {
    cy.get("[id='loginForm'] input[type='email']")
      .should('not.be.disabled')
      .type(`menubreacypress@noroff.no`, { delay: 100 });

    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`12345678{enter}`, { delay: 100 })
      .wait(200);
    cy.get("header [data-auth='logout']")
      .should('exist')
      .click({ force: true });
    cy.url().should('not.include', 'profile').and('not.include', 'name');
  });

  it('CAN validate user input based on API restrictions', () => {
    // The email value must be a valid stud.noroff.no or noroff.no email address.
    cy.get("[id='loginForm'] input[type='email']")
      .should('not.be.disabled')
      .type(`menubreacypress@test.no`, { delay: 100 });
    // The password value must be minimum 8 character in length.
    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`123{enter}`, { delay: 100 });
    cy.url().should('include', 'profile');
  });
});
