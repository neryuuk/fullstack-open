describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/tests/reset`)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('input#username')
    cy.get('input#password')
    cy.get('button#login-button')
  })
})
