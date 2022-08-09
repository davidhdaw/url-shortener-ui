describe('Display urls', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: 'example.json'
    })
    cy.visit('http://localhost:3000/')
  })
  it('should have a header', () => {
    cy.get('h1').should('contain', 'URL Shortener')
  })
  it('should have an input form', () => {
    cy.get('form input:first').invoke('attr','placeholder').should('contain', 'Title')
    cy.get('form input:last').invoke('attr','placeholder').should('contain', 'URL')
    cy.get('button').should('contain', 'Shorten Please!')
  })
  it('should let you fill out the form', () => {
    cy.get('form input:first').invoke('attr','value').should('contain', '')
    cy.get('form input:first').type('bonk bonk bonk').invoke('attr','value').should('contain', 'bonk bonk bonk')
    cy.get('form input:last').invoke('attr','value').should('contain', '')
    cy.get('form input:last').type('bonk bonk bonk').invoke('attr','value').should('contain', 'bonk bonk bonk')
  })
})