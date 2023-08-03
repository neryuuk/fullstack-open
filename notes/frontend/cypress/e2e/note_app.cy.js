const USER = {
  name: 'Nelson A',
  username: 'nelson',
  password: '$lL018U5&xX32sDDh8RrTVdf',
}

describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/tests/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, USER)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function () {
    cy.get('button#show-login').click()
  })

  it('login fails with wrong password', function () {
    cy.get('button#show-login').click()
    cy.get('input#username').type(USER.username)
    cy.get('input#password').type('test')
    cy.get('button#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', `${USER.name} logged in`)
  })

  it('user can login', function () {
    cy.get('button#show-login').click()
    cy.get('input#username').type(USER.username)
    cy.get('input#password').type(USER.password)
    cy.get('button#login-button').click()
    cy.contains(`${USER.name} logged in`)
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login(USER)
      cy.contains(`${USER.name} logged in`)
    })

    it('a new note can be created', function () {
      const NOTE = `a note created by cypress ${Date.now()}`
      cy.get('button#show-new-note').click()
      cy.get('input#note').type(NOTE)
      cy.get('button#new-note-button').click()
      cy.contains(NOTE)
    })

    describe('and a note exists', function () {
      const NOTE = {
        content: `a note created by cypress ${Date.now()}`,
        important: true,
      }

      beforeEach(function () {
        cy.createNote(NOTE)
      })

      it('it can be made not important', function () {
        cy.contains(NOTE.content).parent().find('button').as('button')
        cy.get('@button').click()
        cy.get('@button').should('contain', 'make important')
      })
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('button')
        cy.get('@button').click()
        cy.get('@button').should('contain', 'make not important')
      })
    })
  })
})
