// describe('My First Test', () => {
//   it('clicking "type" navigates to a new url', () => {
//     cy.visit('https://example.cypress.io')

//     cy.contains('type').click()

//     cy.url().should('include', '/commands/actions')
//   })
// })

describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
})