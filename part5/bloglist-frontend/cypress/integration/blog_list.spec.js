describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const testUser1 = {
      username: 'ccfu',
      name: 'Charleson Fu',
      password: 'iamcharlesfu'
    }
    const testUser2 = {
      username: 'pmfm',
      name: 'Paula Fellman',
      password: 'iampaula'
    }
    cy.request('POST', 'http://localhost:3001/api/users', testUser1)
    cy.request('POST', 'http://localhost:3001/api/users', testUser2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login') 
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.getBySel('username').type('ccfu')
      cy.getBySel('password').type('iamcharlesfu')
      cy.getBySel('login-button').click()
      cy.contains('blogs')
    })

    it('fail with incorrect credentials', function() {
      cy.contains('login').click()
      cy.getBySel('username').type('ccfu')
      cy.getBySel('password').type('wrongofcourse')
      cy.getBySel('login-button').click()

      cy.getBySel('error-noti').contains('Wrong username or password')
      cy.getBySel('error-noti').should('have.css', 'color', 'rgb(255, 0, 0)')
      
    })
  })

  describe.only('When logged in', function() {
    // bypassing the login UI
    beforeEach(function() {
      cy.login({username:'ccfu', password:'iamcharlesfu'})
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.getBySel('title-input').type('test-title')
      cy.getBySel('author-input').type('test-author')
      cy.getBySel('url-input').type('test-url')
      cy.getBySel('create-blog-button').click()
      
      // blog list
      cy.getBySel('blog-list').contains('test-title')
      cy.getBySel('blog-list').contains('test-author')
      cy.getBySel('blog-list').contains('test-url')
      
    })

    it('User can like a blog(likes will be updated accordingly to number of clicks)', function() {
      // create one blog
      cy.contains('create new blog').click()
      cy.getBySel('title-input').type('test-title')
      cy.getBySel('author-input').type('test-author')
      cy.getBySel('url-input').type('test-url')
      cy.getBySel('create-blog-button').click()

      // press the view and then like button twice 
      cy.getBySel('blog-list').contains('view').click()
      cy.getBySel('like-button').click()
      cy.getBySel('blog-likes').contains(1)
      cy.getBySel('like-button').click()
      cy.getBySel('blog-likes').contains(2)
    })
    
    describe('remove operations', function() {
      it('User who create the blog can delete it', function(){
        // create one blog
        cy.contains('create new blog').click()
        cy.getBySel('title-input').type('test-title')
        cy.getBySel('author-input').type('test-author')
        cy.getBySel('url-input').type('test-url')
        cy.getBySel('create-blog-button').click()
        // press the view and then like button twice 
        cy.getBySel('blog-list').contains('view').click()
        cy.getBySel('remove-button').click()


        // disaapear from blog list
        cy.getBySel('blog-list').should('not.contain','test-title')
        cy.getBySel('blog-list').should('not.contain','test-author')
        cy.getBySel('blog-list').should('not.contain','test-url')
      })

      it('User who did not create the blog cannot delete it', function(){
        // create one blog
        cy.contains('create new blog').click()
        cy.getBySel('title-input').type('test-title')
        cy.getBySel('author-input').type('test-author')
        cy.getBySel('url-input').type('test-url')
        cy.getBySel('create-blog-button').click()
        // press the logout and login as another user
        cy.logout()
        cy.login({username:'pmfm', password:'iampaula'})

        // press view and remove is not avalible
        cy.getBySel('blog-list').contains('view').click()
        cy.getBySel('blog-list').should('not.contain', 'remove')
      })
    })
  })
})