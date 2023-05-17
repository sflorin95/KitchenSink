/// <reference types="cypress" />

describe("Navigation Tests", () => {
  const baseUrl = "https://demoqa.com/"
  const loginPage = "login"
  const booksPage = "books"
  const profilePage = "profile"
  let password;

  before(() => {
    cy.fixture('cypress.env.json').then((env) => {
      password = env.password;
    });
  });

  context("Actions", () => {
    beforeEach(() => {
      cy.visit(baseUrl)

    });

    it("should navigate to the Login page and make a successfull login", () => {
      cy.visit(baseUrl + loginPage)
      cy.get('#userName').type('Demo Test')
      cy.get('#password').type(password)
      cy.get('#login').click()
      cy.get('#submit').should('exist')
    });

    it("should navigate to the Book Store page and select a book", () => {
      cy.visit(baseUrl + booksPage)
      cy.contains('a[href="/books?book=9781449325862"]', 'Git Pocket Guide').should("exist").click()
      cy.get('#userName-value').should('have.text', '9781449325862');
    });

    it("should navigate to the Book Store page select a book and add it to collection", () => {
      cy.visit(baseUrl + booksPage)
      cy.contains('a[href="/books?book=9781449325862"]', 'Git Pocket Guide').should("exist").click()
      cy.get('#userName-value').should('have.text', '9781449325862');
      cy.get('#addNewRecordButton').click()
    });

  })
})
