/// <reference types="cypress" />

describe("Navigation Tests", () => {
  const baseUrl = "https://www.lambdatest.com/selenium-playground/";
  const link1 = "bootstrap-date-picker-demo";
  const link2 = "jquery-date-picker-demo";

  context("Actions", () => {
    beforeEach(() => {
      cy.visit(baseUrl);
    });

    it("should navigate to bootstrap date picker and add a specific date", () => {
      cy.visit(baseUrl + link1)
      const dateToEnter = "2023-05-01" 
      cy.get('input[type="date"]').type(dateToEnter)
    });

    it("should navigate to bootstrap date picker and select today's date", () => {
      cy.visit(baseUrl + link1)

      // Get the current date
      const today = new Date()
      const currentDate = today.toISOString().split("T")[0]

      // Set today's date in the date picker field
      cy.get('input[type="date"]').clear().type(currentDate)

      // Verify that the selected date is populated in the input field
      cy.get('input[type="date"]').should("have.value", currentDate)
    });
  

    /*it("should navigate to bootstrap date picker with a start date and an end date", () => {
      cy.visit(baseUrl + link1)

      const startDataDateValue = "1682985600000"

      cy.get('td[data-date="' + startDataDateValue + '"]').contains('1').as('startDate').click()
      cy.get('td[data-date="' + startDataDateValue + '"]').parent().next().contains('26').as('endDate').click()

      // Verify that the selected start and end dates are populated in the input field
      cy.get('@startDate').should("have.class", "active")
      cy.get('@endDate').should("have.class", "active")
    })*/

    it("should navigate to the jQuery date picker and select two dates", () => {
      cy.visit(baseUrl + link2)
      cy.get("#from").click()
      cy.get(":nth-child(1) > :nth-child(3) > .ui-state-default").click()
      cy.get(":nth-child(3) > :nth-child(7) > .ui-state-default").click()
    });
    

    it("should navigate to the jQuery date picker and check that the dates before the Start Date are disabled", () => {
      cy.visit(baseUrl + link2)
      cy.get("#from").click()
      cy.get(":nth-child(1) > :nth-child(3) > .ui-state-default").click({force: true})
      cy.get(":nth-child(3) > :nth-child(7) > .ui-state-default").click({force: true})
      cy.get("#from").click()
      cy.get('td.ui-datepicker-unselectable.ui-state-disabled')
      .should('have.class', 'ui-state-disabled');
    });

    it("should navigate to the jQuery date picker and change to the next month", () => {
      cy.visit(baseUrl + link2)
      cy.get("#from").click()
      cy.get('.ui-datepicker-next').click()
      cy.get('.ui-datepicker-month')
        .find('option[value="5"][selected="selected"]')
        .should('exist')
    });
    it("should navigate to the jQuery date picker and change the previous month", () => {
      cy.visit(baseUrl + link2)
      cy.get("#from").click()
      cy.get('.ui-datepicker-prev').click()
      cy.get('.ui-datepicker-month')
        .find('option[value="3"][selected="selected"]')
        .should('exist')
  
    });

    it("should navigate to the jQuery date picker and change to a specific month", () => {
      cy.visit(baseUrl + link2)
      cy.get("#from").click()
      cy.get('.ui-datepicker-month').select('1') // Selects the second option, which corresponds to February
    
      cy.get('.ui-datepicker-month').should('have.value', '1')
    });
    
  });
});
