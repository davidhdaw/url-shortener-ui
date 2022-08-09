describe('api calls', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: 'example.json'
    })
    cy.visit('http://localhost:3000/')
  })
  it('should show new shortened urls', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: 'postResponse.json'
    })
    cy.get('.url:last').should('contain', 'Bonk')
    cy.get('form input:first').type('Test Test')
    cy.get('form input:last').type('Thisis@testdata.com')
    cy.get('button:first').click()
    cy.get('.url:last').should('contain', 'Test Test')
  })
  it('should show an error if the request is rejected', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 501,
      fixture: 'postResponse.json'
    })
    cy.get('form input:first').type('Test Test')
    cy.get('form input:last').type('Thisis@testdata.com')
    cy.get('button:first').click()
    cy.get('h2').should('contain', 'Something went wrong with the server')
  })
  it('should delete a post', () => {
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/urls/3', {
      statusCode: 204,
    })
    cy.get('.url:last').should('contain', 'Bonk')
    cy.get('button:last').click()
    cy.get('.url:last').should('not.contain', 'Bonk')
  })
})