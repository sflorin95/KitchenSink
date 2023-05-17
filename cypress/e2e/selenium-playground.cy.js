/// <reference types="cypress" />
context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://www.lambdatest.com/selenium-playground/')
    cy.get('#__next > div.wrapper > section.my-50 > div > div > div:nth-child(1) > div:nth-child(1) > ul > li:nth-child(1) > a').click()
  })
    
  it('.click() - click on Simple Form Demo', () => {
    
    cy.get('#user-message').type('Test')
    cy.get('#showInput').click()
    cy.get('#message').should('have.text','Test')
  })

  it('.click() - click on Two Input Fields Demo', () => {
    const firstValue = 1
    const secondValue = 3
    cy.get('#sum1').type(firstValue)
    cy.get('#sum2').type(secondValue)
    cy.get('#gettotal > button').click()
    cy.get('#addmessage').should('have.text', 4)
  })
})


