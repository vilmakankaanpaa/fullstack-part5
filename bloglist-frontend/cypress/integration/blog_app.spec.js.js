// blog_app.spec.js.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Vilma K',
      username: 'vilmak',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('#loginform')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('vilmak')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
  
      cy.contains('Vilma K logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vilmak')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Vilma K logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'vilmak', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('A blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('www.cypressblog.com')
      cy.contains('save').click()
      cy.contains('A blog created by cypress')
    })

    describe('and several blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'first author', url: 'www.firsturl.com'})
        cy.createBlog({ title: 'second blog', author: 'second author', url: 'www.secondturl.com'})
        cy.createBlog({ title: 'third blog', author: 'third author', url: 'www.thirdurl.com'})
      })

      it('one of those can be liked', function () {
        cy.contains('first blog').find('#view-button').click()
        cy.contains('first blog').find('#like-button').click()
        cy.contains('first blog').should('contain', 'likes 0')
      })

      it.only('user who created the blog can remove it', function() {
        cy.contains('first blog').find('#view-button').click()
        cy.contains('first blog').find('#remove-button').click()

        cy.get('html').should('not.contain', 'first blog')
        cy.get('html').should('Blog by first author removed')
      })

    })
  })
})