
describe('Blog App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // cy.request('POST', 'http://localhost:3001/api/testing/seed')
    cy.request('POST', 'http://localhost:3001/api/user', {
      username: 'kafkafranz',
      name: 'Franz Kafka',
      password: 'thecastletrial7'
    })
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
        .type('kafkafranz')
      cy.get('#login-form form input[name="password"]')
        .type('thecastletrial7')
      cy.contains('login')
        .click()

      // Info about the logged in user is visible
      cy.get('#logged-in-user')
        .then(() => {
          cy.get('html').should('contain', 'Franz Kafka logged in')
          cy.contains('log out')
            .click()
        })
    })

    it('fails with wrong username', function(){
      cy.visit('/')
      cy.get('#login-form form input[name="username"]')
        .type('wronguser')
      cy.get('#login-form form input[name="password"]')
        .type('thecastletrial7')
      cy.contains('login')
        .click()
      cy.get('.error')
      cy.get('.error')
        .should('have.css', 'border-color', 'rgb(255, 0, 0)')
      cy.get('.error')
        .should('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Franz Kafka logged in')
      // login form is still present
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })

    it('fails with wrong password', function(){
      cy.visit('/')
      cy.get('#login-form form input[name="username"]')
        .type('kafkafranz')
      cy.get('#login-form form input[name="password"]')
        .type('wrongpassword')
      cy.contains('login')
        .click()
      cy.get('.error')
    })

  })

  describe('when logged in', function(){
    beforeEach(function(){
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'kafkafranz',
        password: 'thecastletrial7'
      }).then(response => {
        localStorage.setItem('loggedBlogListappuser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    describe('Adding a blog', function(){
      it('can create blog', function(){
        cy.contains('new blog').click()
        cy.get('input[name="title"]')
          .type('Test Blog Title')
        cy.get('input[name="author"]')
          .type('Test Blog Author')
        cy.get('input[name="url"]')
          .type('http://www.wikipedia.org')
        cy.contains('submit').click()
        cy.get('.blogEntry')
          .contains('Test Blog Title')
      })
    })

    Cypress.Commands.add('createBlog', ({ title, author, url }) => {
      cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: {
          'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogListappuser')).token}`
        }
      })
      cy.visit('http://localhost:3000')
    })

    describe('liking a blog', function(){

      describe('when one blog exist', function(){
        beforeEach(function(){
          cy.createBlog({
            title: 'New Blog Title One',
            author: 'Newt Blogger',
            url: 'http://www.twitter.com',
          })
        })

        it('is successful', function(){
          cy.visit('/')
          cy.contains('New Blog Title One by Newt Blogger')
            .contains('details').click()
          cy.get('.blogLikes')
            .contains('Likes: 0')
            .contains('like').click()

          cy.get('.blogLikes').should('contain', 'Likes: 1')
        })
      })

      describe('when several blogs exist', function(){
        beforeEach(function(){
          cy.createBlog({
            title: 'New Blog Title One',
            author: 'Newt Blogger',
            url: 'http://www.twitter.com',
          })
          cy.createBlog({
            title: 'New Blog Title Two',
            author: 'Newt Blogger II',
            url: 'http://www.tumblr.com',
          })
          cy.createBlog({
            title: 'New Blog Title Three',
            author: 'Newt Blogger',
            url: 'http://www.google.com',
          })
        })

        it('is successful', function(){
          cy.contains('New Blog Title Two by Newt Blogger II')
            .parent().find('.blogDetailsBtn').click()
          cy.contains('New Blog Title Two by Newt Blogger II')
            .parent().find('.blogLikeBtn').click()
          cy.contains('New Blog Title Two by Newt Blogger II')
            .parent().find('.blogLikes')
            .should('contain', 'Likes: 1')
        })
      })
    })

    describe.only('deleting a blog', function(){

      it('is successful', function(){
        cy.createBlog({
          title: 'New Blog Title One',
          author: 'Newt Blogger',
          url: 'http://www.twitter.com',
        })
        cy.visit('/')
        cy.contains('New Blog Title One by Newt Blogger')
          .contains('details').click()
        cy.contains('New Blog Title One by Newt Blogger')
          .parent().find('.blogRemoveBtn').click()

        cy.get('html').should('not.contain', 'New Blog Title One by Newt Blogger')
      })

      it('fails for ones posted by other users', function(){
        cy.request('POST', 'http://localhost:3001/api/testing/seed')
        cy.visit('/')
        cy.get('.blogDetailsBtn').first().click()
        cy.get('.blogDetails').first().should('not.contain', 'remove')
      })

    })
  })
})
