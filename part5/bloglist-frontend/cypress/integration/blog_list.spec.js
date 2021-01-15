describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const testUser = {
      username: 'Ting',
      name: 'Charleson Ting',
      password: 'iamcharlesting'
    }
    cy.request('POST', 'http://localhost:3001/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login') 
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.getBySel('username').type('Ting')
      cy.getBySel('password').type('iamcharlesting')
      cy.getBySel('login-button').click()
      cy.contains('blogs')
    })

  })
})