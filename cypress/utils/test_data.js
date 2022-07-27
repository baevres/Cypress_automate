export const test_data = {
    getUniqueValue(value){
        const uuid = () => Cypress._.random(0, 1e4)
        const uniqueValue = value + uuid()
        return uniqueValue
    }
}