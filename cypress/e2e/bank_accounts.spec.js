const {bank_accounts_creating} = require("../selectors/bank_accounts_creating");
const {users} = require("../utils/users");
const {test_data} = require("../utils/test_data");

describe('testing of bank accounts functionality', () => {
    const user1 = users.testUser1, newUser = users.newUser, password = 's3cret';
    const bank = {
        bank_name: test_data.getUniqueValue('Test Bank'),
        routing_number: '123456789',
        account_number: '987654321'
    }

    beforeEach('visiting sign in page', () => {
        cy.visit('/')
    })

    afterEach('logout', () => {
        cy.ui_logout()
    })

    it('creates a new bank account', () => {
        cy.ui_sign_up(newUser)
        cy.ui_login(newUser.username, password)

        cy.get(bank_accounts_creating.next_btn).click()
        cy.contains(bank_accounts_creating.title).should('be.visible')

        cy.getInputField(bank_accounts_creating.bank_name_field).type(bank.bank_name).should('have.value', bank.bank_name)
        cy.getInputField(bank_accounts_creating.routing_number).type(bank.routing_number).should('have.value', bank.routing_number)
        cy.getInputField(bank_accounts_creating.account_number).type(bank.account_number).should('have.value', bank.account_number)

        cy.get(bank_accounts_creating.submit_btn).click()
        cy.contains('Done').click()
    })

    it('should display bank account form errors', () => {
        cy.ui_login(newUser.username, password)

        cy.contains('Bank Accounts').click()
        cy.get(bank_accounts_creating.create_btn).click()

        cy.get(bank_accounts_creating.bank_name_field).find('input').focus().blur()
        cy.get(bank_accounts_creating.bank_name_field).contains('Enter a bank name')
        cy.get(bank_accounts_creating.bank_name_field).type('1').contains('Must contain at least 5 characters')

        cy.get(bank_accounts_creating.routing_number).find('input').focus().blur()
        cy.get(bank_accounts_creating.routing_number).contains('Enter a valid bank routing number')
        cy.get(bank_accounts_creating.routing_number).type('1').contains('Must contain a valid routing number')
        cy.get(bank_accounts_creating.routing_number).clear().type('01234567890').contains('Must contain a valid routing number')

        cy.get(bank_accounts_creating.account_number).find('input').focus().blur()
        cy.get(bank_accounts_creating.account_number).contains('Enter a valid bank account number')
        cy.get(bank_accounts_creating.account_number).type('1').contains('Must contain at least 9 digits')
    })

    it('user should be able to delete a bank account', () => {
        cy.ui_login(newUser.username, password)

        cy.contains('Bank Accounts').click()
        cy.contains('Delete').click()

        cy.contains('(Deleted)')
    })
})