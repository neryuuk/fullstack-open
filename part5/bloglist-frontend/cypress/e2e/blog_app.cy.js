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

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.contains('log in to application')
      cy.get('input#username').type(USER.username)
      cy.get('input#password').type('password')
      cy.get('button#login-button').click()
      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('succeeds with correct credentials', function () {
      cy.contains('log in to application')
      cy.get('input#username').type(USER.username)
      cy.get('input#password').type(USER.password)
      cy.get('button#login-button').click()
      cy.contains(`${USER.name} logged in`)
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login(USER)
        cy.contains(`${USER.name} logged in`)
      })

      it('a new blog can be created', function () {
        const BLOG = {
          title: 'New Test Blog',
          author: 'Author Testington',
          url: 'https://google.com',
        }
        cy.get('button#show-new-blog').click()
        cy.get('input#title').type(BLOG.title)
        cy.get('input#author').type(BLOG.author)
        cy.get('input#url').type(BLOG.url)
        cy.get('button#new-blog-button').click()
        cy.contains(`a new blog ${BLOG.title} by ${BLOG.author} added`)
        cy.visit('')
        cy.contains(`${BLOG.title} ${BLOG.author}`)
      })
    })
  })
})
