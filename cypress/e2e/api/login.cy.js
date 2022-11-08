describe('Social Media Client: Testing login-form validation', () => {
  const email = Cypress.env('email');
  const password = Cypress.env('password');
  const faultyEmail = Cypress.env('faulty_email');
  const faultyPassword = Cypress.env('faulty_password');

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/').wait(500);

    cy.get("form [data-auth='login']")
      .contains('Login')
      .should('not.be.hidden')
      .click()
      .wait(1000);
  });

  it('CAN successfully log in a valid user', () => {
    cy.get("form#loginForm input[type='email']")
      .should('not.be.disabled')
      .type(email, { delay: 100 });

    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`${password}{enter}`, { delay: 100 })
      .wait(1000);

    cy.url().should('include', 'profile');
  });

  it('CAN successfully log out user', () => {
    cy.get("[id='loginForm'] input[type='email']")
      .should('not.be.disabled')
      .type(email, { delay: 100 });

    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`${password}{enter}`, { delay: 100 })
      .wait(1000);

    cy.get("header [data-auth='logout']")
      .should('exist')
      .click({ force: true })
      .wait(1000);

    cy.url().should('not.include', 'profile');
  });

  it('CAN validate user input based on API restrictions', () => {
    // The email value must be a valid stud.noroff.no or noroff.no email address.
    cy.get("[id='loginForm'] input[type='email']")
      .should('not.be.disabled')
      .type(faultyEmail, { delay: 100 });
    // The password value must be minimum 8 character in length.
    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`${faultyPassword}{enter}`, { delay: 100 })
      .wait(1000);

    cy.url().should('include', 'profile');
  });
});
