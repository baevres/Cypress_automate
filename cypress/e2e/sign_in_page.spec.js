const {sign_in_page} = require("../selectors/sign_in_page");
const {sign_up_page} = require("../selectors/sign_up_page");
const {users} = require("../utils/users");

describe('UI tests for sign in page', () => {
    const user1 = users.testUser1, newUser = users.newUser;
    const password = 's3cret';

    beforeEach('visiting sign in page', () => {
        cy.visit('/')
    })

    it('should show "Real World App logo"', () => {
        cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    })

    it('should show "Sign in" title', () => {
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })

    // Homework 14.07:
    it('should show typeable Username field', () => {
        cy.get(sign_in_page.username).should('be.visible').and('match', 'input')
    })

    it('should show typeable Password field', () => {
        cy.get(sign_in_page.password).should('be.visible').and('match', 'input')
    })

    it('should show Username and Password placeholders', () => {
        cy.get(sign_in_page.username).blur()
        cy.get(sign_in_page.username_field).should('contain', 'Username').and('be.visible')
        cy.get(sign_in_page.password_field).should('contain', 'Password').should('be.visible')
    })

    it('should show "Username is required" error', () => {
        cy.get(sign_in_page.title_text).click()
        cy.get(sign_in_page.username_field).contains('Username is required')
            .should('be.visible').and('have.id', 'username-helper-text')
    })

    it('check "Remember me" checkbox', () => {
        cy.get(sign_in_page.remember_me_checkbox).should('not.be.checked').check().should('be.checked')
    })

    it('should show disabled by default sign in btn', () => {
        // check disabled sign in btn
        cy.get(sign_in_page.username).blur()
        cy.get(sign_in_page.sign_in_button).as('submitButton').should('be.visible').and('be.disabled')
        // check enabled sign in btn
        cy.get(sign_in_page.username).type('Some user').should('have.value', 'Some user')
        cy.get(sign_in_page.password).type(password).should('have.value', password)
        cy.get('@submitButton').should('be.visible').and('be.enabled')
    })

    it('should have "Don\'t have an account? Sign Up" clickable link', () => {
        cy.contains('Don\'t have an account? Sign Up').should('be.visible').click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign Up')
        cy.contains('Have an account? Sign In').should('be.visible').click()
    })

    it('should show Cypress copyright link that leads to \'https://cypress.io/\'', () => {
        cy.get(sign_in_page.cypress_logo_container).find('a').should('be.visible')
            .and('have.attr', 'href', 'https://cypress.io')
    })

    // Homework 19.07:
    it('should allow a visitor to sign-up', () => {
        cy.visit('/signup')
        cy.getInputField(sign_up_page.first_name).type(newUser.firstName).should('have.value', newUser.firstName)
        cy.getInputField(sign_up_page.last_name).type(newUser.lastName).should('have.value', newUser.lastName)
        cy.getInputField(sign_up_page.username).type(newUser.username).should('have.value', newUser.username)
        cy.getInputField(sign_up_page.password).type(password).should('have.value', password)
        cy.getInputField(sign_up_page.confirm_password).type(password).should('have.value', password)
        cy.get(sign_up_page.sign_up_button).should('be.visible').and('be.enabled').click()
        cy.location("pathname").should("equal", "/signin");
    })

    it('should allow a visitor to login', () => {
        cy.get(sign_in_page.username).type(newUser.username).should('have.value', newUser.username)
        cy.get(sign_in_page.password).type(password).should('have.value', password)
        cy.get(sign_in_page.sign_in_button).should('be.visible').and('be.enabled').click()
        cy.location("pathname").should("equal", "/");
    })

    it('should allow a visitor to logout', () => {
        cy.ui_login(user1.username, password)
        cy.location("pathname").should("equal", "/");
        cy.contains('Logout').should('be.visible').click()
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })

    // Homework 21.07
    it('should display login errors', () => {
        cy.get(sign_in_page.username).blur()
        cy.get(sign_in_page.username_field).contains('Username is required')

        cy.get(sign_in_page.password).type('1').blur()
        cy.get(sign_in_page.password_field).contains('Password must contain at least 4 characters')
    })

    it('should display signup errors', () => {
        cy.visit('/signup')

        cy.getInputField(sign_up_page.first_name).blur()
        cy.get(sign_up_page.first_name).contains('First Name is required')

        cy.getInputField(sign_up_page.last_name).focus().blur()
        cy.get(sign_up_page.last_name).contains('Last Name is required')

        cy.getInputField(sign_up_page.username).focus().blur()
        cy.get(sign_up_page.username).contains('Username is required')

        cy.getInputField(sign_up_page.password).focus().blur()
        cy.get(sign_up_page.password).contains('Enter your password')
        cy.getInputField(sign_up_page.password).type('1').should('have.value', '1')
        cy.get(sign_up_page.password).contains('Password must contain at least 4 characters')

        cy.getInputField(sign_up_page.confirm_password).focus().blur()
        cy.get(sign_up_page.confirm_password).contains('Confirm your password')
        cy.getInputField(sign_up_page.confirm_password).type('2').should('have.value', '2')
        cy.get(sign_up_page.confirm_password).contains('Password does not match')
    })

    it('should error for an invalid user', () => {
        cy.get(sign_in_page.username).type('invalid user').should('have.value', 'invalid user')
        cy.get(sign_in_page.password).type('1111').should('have.value', '1111')
        cy.get(sign_in_page.sign_in_button).click()

        cy.get(sign_in_page.sign_in_error).contains('Username or password is invalid')
    })

    it('should error for an invalid password for existing user', () => {
        cy.get(sign_in_page.username).type(newUser.username).should('have.value', newUser.username)
        cy.get(sign_in_page.password).type('1111').should('have.value', '1111')
        cy.get(sign_in_page.sign_in_button).click()

        cy.get(sign_in_page.sign_in_error).contains('Username or password is invalid')
    })

})