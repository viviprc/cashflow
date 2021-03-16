describe('Testeando el proceso de venta', () => {
  beforeEach(() => {
    cy.login('viviana@gmail.com', '123456789')
    cy.wait(500)
  })
  afterEach(() => {
    cy.logout()
  })
  it('Buscar producto para agregar a venta', () => {
    cy.get('#buscarProducto').wait(500).type('asi')
    cy.get('td:first').should('contain', 'ASI')
    cy.get('td:first').click()
    cy.get('td:first')
      .invoke('text')
      .then((text) => {
        cy.get('#productName').should('contain', text)
      })
    cy.get('#agregarProducto').click()

    cy.get('#buscarProducto').wait(500).type('esm')
    cy.get('#tablaBusqueda td:first').should('contain', 'ESM')
    cy.get('#tablaBusqueda td:first').click()
    cy.get('#tablaBusqueda td:first')
      .invoke('text')
      .then((text) => {
        cy.get('#productName').should('contain', text)
      })
    cy.get('#agregarProducto').click()

    cy.get('.subtotal')
      .first()
      .invoke('text')
      .then((text) => {
        let subtotal = parseInt(text, 10)

        cy.get('.subtotal')
          .last()
          .invoke('text')
          .then((text) => {
            subtotal += parseInt(text, 10)

            cy.get('#totalSale').should('contain', subtotal.toString())
          })
      })

    cy.get('#finalizar').click()
    cy.get('#cerrar').click()
  })
})
