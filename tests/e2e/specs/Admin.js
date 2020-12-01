describe('Testeando crud de usuarios en Admin', () => {
    beforeEach(() => {
        cy.login('viviana@admin.cl', '987654321')
    })
    afterEach(() => {
        cy.logout()
    })
    it('Probando agregar y editar usuario', () => {
        cy.wait(2000)
        cy.visitRoute('#Admin')
        cy.get('#agregarUsuario').click()
        cy.get('#nombreUsuario').type('Marcos Carrasco')
        cy.get('#emailUsuario').type('marcos@gmail.com')
        cy.get('#claveUsuario').type('987654321')
        cy.get('.col > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon').click()
        cy.get('.v-select-list:nth-child(1)').click()
        cy.get('#guardarUsuario').click()

        cy.wait(2000)
        cy.get(':nth-child(1) > :nth-child(4) > .v-icon').click()
        cy.get('.col > .v-input > .v-input__control > .v-input__slot > .v-select__slot > .v-input__append-inner > .v-input__icon > .v-icon').click()
        cy.get('.v-select-list:nth-child(1)').click()
        cy.get('#guardarUsuario').click()
    })
   })
  
