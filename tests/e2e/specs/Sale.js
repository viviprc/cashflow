
describe('Sale Test', () => {
    it('Visits the app root url', () => {
      cy.visit('/sale')
      cy.get('#input-143').type('ma')
    })
  })