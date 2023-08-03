const USER = {
  name: 'Nelson A',
  username: 'nelson',
  password: '$lL018U5&xX32sDDh8RrTVdf',
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/tests/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, USER)
    cy.visit('')
  })

  it('login form is shown', function () {
    cy.contains('log in to application')
    cy.get('input#username')
    cy.get('input#password')
    cy.get('button#login-button')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in to application')
      cy.get('input#username').type(USER.username)
      cy.get('input#password').type(USER.password)
      cy.get('button#login-button').click()
      cy.contains(`${USER.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in to application')
      cy.get('input#username').type(USER.username)
      cy.get('input#password').type('password')
      cy.get('button#login-button').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
})
