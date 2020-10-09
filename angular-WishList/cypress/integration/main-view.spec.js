describe('ventana principal', () => {
    it('tiene encabezado correcto y en español por defecto', () => {
        cy.visit('http://localhost:4200');
        cy.contains('angular-WishList');
        cy.get('h1 b').should('contain', 'Hola');
    })
});