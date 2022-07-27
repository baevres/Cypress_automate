// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {sign_up_page} from "../selectors/sign_up_page";
import {sign_in_page} from "../selectors/sign_in_page";
import {bank_accounts_creating} from "../selectors/bank_accounts_creating";

Cypress.Commands.add('getInputField', (field) => {
    cy.get(field).find('input')
})

Cypress.Commands.add('ui_sign_up', (user, password='s3cret') => {
    cy.visit('/signup')
    cy.getInputField(sign_up_page.first_name).type(user.firstName).should('have.value', user.firstName)
    cy.getInputField(sign_up_page.last_name).type(user.lastName).should('have.value', user.lastName)
    cy.getInputField(sign_up_page.username).type(user.username).should('have.value', user.username)
    cy.getInputField(sign_up_page.password).type(password).should('have.value', password)
    cy.getInputField(sign_up_page.confirm_password).type(password).should('have.value', password)
    cy.get(sign_up_page.sign_up_button).should('be.visible').and('be.enabled').click()
    cy.location("pathname").should("equal", "/signin");
})

Cypress.Commands.add('ui_login', (username, password) => {
    cy.get(sign_in_page.username).type(username).should('have.value', username)
    cy.get(sign_in_page.password).type(password).should('have.value', password)
    cy.get(sign_in_page.sign_in_button).click()
})

Cypress.Commands.add('ui_logout', () => {
    cy.contains('Logout').should('be.visible').click()
    cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    cy.location("pathname").should("equal", "/signin");
})

Cypress.Commands.add('ui_onboarding', (bank) => {
    cy.contains('Bank Accounts').click()
    cy.get(bank_accounts_creating.create_btn).click()

    cy.getInputField(bank_accounts_creating.bank_name_field).type(bank.bank_name).should('have.value', bank.bank_name)
    cy.getInputField(bank_accounts_creating.routing_number).type(bank.routing_number).should('have.value', bank.routing_number)
    cy.getInputField(bank_accounts_creating.account_number).type(bank.account_number).should('have.value', bank.account_number)

    cy.get(bank_accounts_creating.submit_btn).click()
})