describe('Social Media Client: Testing login-form validation', () => {
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
  });

  it('CAN successfully log in and out a valid user', () => {
    cy.get("form#loginForm input[type='email']")
      .should('not.be.disabled')
      .type(email, { delay: 100 });

    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`${password}{enter}`, { delay: 100 })
      .wait(1000);

    cy.then(() => {
      expect(localStorage.getItem('token')).to.not.be.null;
    });

    cy.url().should('include', 'profile');

    cy.get("header [data-auth='logout']")
      .should('exist')
      .click({ force: true })
      .wait(1000);

    cy.then(() => {
      expect(localStorage.getItem('token')).to.be.null;
    });

    cy.url().should('not.include', 'profile');
  });

  it('CAN validate user input email based on API restrictions', () => {
    // The email value must be a valid stud.noroff.no or noroff.no email address.
    cy.get("[id='loginForm'] input[type='email']")
      .should('not.be.disabled')
      .type('menubreacypress@test.no', { delay: 100 });
    // The password value must be minimum 8 character in length.
    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`${password}{enter}`, { delay: 100 })
      .wait(1000);

    cy.url().should('not.include', 'profile');
  });

  it('CAN validate user input password based on API restrictions', () => {
    // The email value must be a valid stud.noroff.no or noroff.no email address.
    cy.get("[id='loginForm'] input[type='email']")
      .should('not.be.disabled')
      .type(email, { delay: 100 });
    // The password value must be minimum 8 character in length.
    cy.get("[id='loginForm'] input[type='password']")
      .should('not.be.disabled')
      .type(`1234{enter}`, { delay: 100 })
      .wait(1000);

    cy.url().should('not.include', 'profile');
  });
});
