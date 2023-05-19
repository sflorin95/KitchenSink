describe("Navigation Tests", () => {
  const baseUrl = "https://www.lambdatest.com/selenium-playground/";
  const tablePagination = "table-pagination-demo";
  const tableDataSearch = "table-search-filter-demo";
  const tableFilter = "table-records-filter-demo";
  const tableSortAndSearch = "table-sort-search-demo";

  context("Actions", () => {
    beforeEach(() => {
      cy.visit(baseUrl);
    });

    it("should navigate to the table pagination example and select show all rows", () => {
      cy.visit(baseUrl+tablePagination)
      cy.get(".container").invoke("removeAttr", "style") // Remove the "style" attribute that covers the <select> element
      cy.get("#maxRows").select("5000", { force: true })
      cy.get('#table-id > tbody > tr:nth-child(30) > td:nth-child(3)').should('contain', 'Frost.Quisque@Nunc.org')
    });
    it("should navigate to the table data search and make a search", () => {
      cy.visit(baseUrl+tableDataSearch);
      cy.get('#task-table-filter').type('SEO');
      cy.get('#task-table > tbody').should('contain', 'SEO tags');
    })
    it("should activate the column and check if the user can filter by the last name", () => {
      cy.visit(baseUrl+tableDataSearch);
      cy.get('button.btn.btn-default.btn-xs.btn-filter.border.border-black').click();
      cy.get('input[placeholder="Last Name"]').type('deployed');
      cy.get('<tr style=""><td>5</td><td>jQuery library</td><td>Holden Charles</td><td>deployed</td></tr>');
      cy.contains('tr', 'Holden Charles')  .should('be.visible');
    })
    it("should filter the colors one by one and check if they are displayed correctly", () => {
      cy.visit(baseUrl+tableFilter);
      cy.get('.btn.btn-success.btn-filter').click();
      cy.get('[data-status="pagado"]').should('be.visible');
      cy.get('.btn.btn-warning.btn-filter').click();
      cy.get('[data-status="pendiente"]').should('be.visible');
      cy.get('.btn.btn-danger.btn-filter').click();
      cy.get('[data-status="cancelado"]').should('be.visible');
      cy.get('.btn.btn-default.btn-filter').click();
      cy.get('[data-target="all"]').should('be.visible');
    })
    it("should sort the columns ascending and descending by clicking on a column name" , () =>{
      cy.visit(baseUrl+tableSortAndSearch);
      cy.get('[aria-label="Age: activate to sort column ascending"]').click().should('have.attr', 'aria-label', 'Age: activate to sort column descending');
    })
  });
});
