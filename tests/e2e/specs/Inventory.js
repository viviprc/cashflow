describe('Testeando el crud de inventario', () => {
  beforeEach(() => {
    cy.login('viviana@admin.cl', '987654321')
  })
  afterEach(() => {
    cy.logout()
  })
  it('Probando crud de inventario', () => {
    cy.wait(2000)
    cy.visitRoute('#Inventory')
    cy.get('#agregarProducto').click()
    cy.get('#nombreProducto').type('Llave Stillson 8" acero')
    cy.get('#skuProducto').type('127361')
    cy.get('#stockProducto').type('24')
    cy.get('#categoriaProducto').type('Herramientas')
    cy.get('#marcaProducto').type('Redline')
    cy.get('#precioProducto').type('7190')
    cy.get('#guardar').click()

    cy.contains('td', 'Llave Stillson 8" acero', { matchCase: false })

    cy.contains('td', 'Llave Stillson 8" acero', { matchCase: false })
      .siblings('td')
      .last()
      .children('button')
      .first()
      .click()
    cy.get('#stockProducto').type('{backspace}0')
    cy.get('#guardar').click()

    cy.contains('td', 'Llave Stillson 8" acero', { matchCase: false })
      .siblings('td')
      .last()
      .children('button')
      .last()
      .click()
    cy.get('#okBorrar').click()

    cy.contains('td', 'Llave Stillson 8" acero', { matchCase: false }).should(
      'not.exist'
    )
  })
})
