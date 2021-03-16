Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:8080/login')
  cy.get('.correo').type(email)
  cy.get('.clave').type(password)
  cy.get('#login').click()
})

Cypress.Commands.add('logout', () => {
  cy.get('#Menu').click()
  cy.get('#Logout').click()
})

Cypress.Commands.add('visitRoute', (route) => {
  cy.get('#Menu').click()
  cy.get(route).click()
})
