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
      const BLOG = {
        title: 'New Test Blog',
        author: 'Author Testington',
        url: 'https://google.com',
      }

      beforeEach(function () {
        cy.login(USER)
        cy.contains(`${USER.name} logged in`)
      })

      it('a new blog can be created', function () {
        cy.get('button#show-new-blog').click()
        cy.get('input#title').type(BLOG.title)
        cy.get('input#author').type(BLOG.author)
        cy.get('input#url').type(BLOG.url)
        cy.get('button#new-blog-button').click()
        cy.contains(`a new blog ${BLOG.title} by ${BLOG.author} added`)

        cy.visit('')
        cy.contains(`${BLOG.title} ${BLOG.author}`)
      })

      it('a blog can be liked', function () {
        cy.get('button#show-new-blog').click()
        cy.get('input#title').type(BLOG.title)
        cy.get('input#author').type(BLOG.author)
        cy.get('input#url').type(BLOG.url)
        cy.get('button#new-blog-button').click()

        cy.visit('')
        cy.contains(`${BLOG.title} ${BLOG.author}`)
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('you liked \'New Test Blog\'')
      })

      it('a blog can be deleted', function () {
        cy.get('button#show-new-blog').click()
        cy.get('input#title').type(BLOG.title)
        cy.get('input#author').type(BLOG.author)
        cy.get('input#url').type(BLOG.url)
        cy.get('button#new-blog-button').click()

        cy.visit('')
        cy.contains(`${BLOG.title} ${BLOG.author}`)
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('Removed blog \'New Test Blog\' by Author Testington')
      })

      it('a blog by other user cannot be deleted', function () {
        const OTHER_USER = { username: 'other', password: 'other', name: 'other' }
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, OTHER_USER).then(() => {
          return cy.request('POST', `${Cypress.env('BACKEND')}/login`, OTHER_USER)
        }).then(({ body }) => {
          cy.request({
            url: `${Cypress.env('BACKEND')}/blogs`,
            method: 'POST',
            body: BLOG,
            headers: { 'Authorization': `Bearer ${body.token}` },
          })
        })

        cy.visit('')
        cy.contains(`${BLOG.title} ${BLOG.author}`)
        cy.contains('view').click()
        cy.should('not.contain', 'remove')
      })

      it('blogs are ordered by likes', function () {
        cy.createBlog({ ...BLOG, title: BLOG.title + ' 8', likes: 8 })
        cy.createBlog({ ...BLOG, title: BLOG.title + ' 12', likes: 12 })
        cy.createBlog({ ...BLOG, title: BLOG.title + ' 3', likes: 3 })
        cy.createBlog({ ...BLOG, title: BLOG.title + ' 13', likes: 13 })

        cy.visit('')
        cy.get('.blog').eq(0).should('contain', 'New Test Blog 13')
        cy.get('.blog').eq(1).should('contain', 'New Test Blog 12')
        cy.get('.blog').eq(2).should('contain', 'New Test Blog 8')
        cy.get('.blog').eq(3).should('contain', 'New Test Blog 3')
      })
    })
  })
})
