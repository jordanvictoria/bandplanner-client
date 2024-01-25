import 'cypress-iframe';



// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, selector) => {
  return cy.wrap($iframe).iframeLoaded().its('document').getInDocument(selector);
});





Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');

  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(`${password}{enter}`);

  // Wait for the login to complete and assert the redirect or any other post-login checks
  cy.url().should('eq', 'http://localhost:3000/'); // Adjust the URL accordingly

  // You can add more assertions or checks here if needed
});
