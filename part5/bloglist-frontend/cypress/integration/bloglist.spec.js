
describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/testing/seed')
    cy.visit('http://localhost:3000')
  })

  it('shows login form', function(){
    cy.visit('/')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login', function(){

    it('succeeds with valid user credentials', function(){
      cy.visit('/')
      cy.get('#login-form form input[name="username"]')
        .type('testuser1')
      cy.get('#login-form form input[name="password"]')
        .type('testuserpassword1')
      cy.contains('login')
        .click()

      cy.get('#logged-in-user')
        .then(() => {
          cy.contains('Test User One logged in')
          cy.contains('log out')
            .click()
        })
    })

    it('fails with invalid credentials, error message is red', function(){
      cy.visit('/')
      cy.get('#login-form form input[name="username"]')
        .type('testuser1')
      cy.get('#login-form form input[name="password"]')
        .type('wrongtestuserpassword')
      cy.contains('login')
        .click()
      cy.get('.notification')
        .should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })

  })
})
