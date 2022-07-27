const {test_data} = require("../utils/test_data");

export const users = {
    testUser1: {
        "id": "t45AiwidW",
        "uuid": "6383f84e-b511-44c5-a835-3ece1d781fa8",
        "firstName": "Edgar",
        "lastName": "Johns",
        "username": "Katharina_Bernier",
        "password": "$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW",
        "email": "Norene39@yahoo.com",
        "phoneNumber": "625-316-9882",
        "avatar": "https://cypress-realworld-app-svgs.s3.amazonaws.com/t45AiwidW.svg",
        "defaultPrivacyLevel": "public",
        "balance": 168137,
        "createdAt": "2019-08-27T23:47:05.637Z",
        "modifiedAt": "2020-05-21T11:02:22.857Z"
    },
    testUser2: {
        "id": "qywYp6hS0U",
        "uuid": "f96efce8-1909-4df4-b5cd-59883cd19c37",
        "firstName": "Arely",
        "lastName": "Kertzmann",
        "username": "Tavares_Barrows",
        "password": "$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW",
        "email": "Aniya_Powlowski36@hotmail.com",
        "phoneNumber": "537-041-4355",
        "avatar": "https://cypress-realworld-app-svgs.s3.amazonaws.com/qywYp6hS0U.svg",
        "defaultPrivacyLevel": "private",
        "balance": 101805,
        "createdAt": "2019-09-09T13:48:45.489Z",
        "modifiedAt": "2020-05-21T02:34:01.483Z"
    },
    testUser3: {
        "id": "bDjUb4ir5O",
        "uuid": "b4ebe114-141c-4397-9346-dd37d788f71b",
        "firstName": "Kaylin",
        "lastName": "Homenick",
        "username": "Allie2",
        "password": "$2a$10$5PXHGtcsckWtAprT5/JmluhR13f16BL8SIGhvAKNP.Dhxkt69FfzW",
        "email": "Rebeca35@yahoo.com",
        "phoneNumber": "072-208-4283",
        "avatar": "https://cypress-realworld-app-svgs.s3.amazonaws.com/bDjUb4ir5O.svg",
        "defaultPrivacyLevel": "private",
        "balance": 164867,
        "createdAt": "2019-09-15T04:44:05.536Z",
        "modifiedAt": "2020-05-21T18:25:10.341Z"
    },
    newUser: {
        "firstName": test_data.getUniqueValue("Serhii"),
        "lastName": test_data.getUniqueValue("Kuldibaiev"),
        "username": test_data.getUniqueValue("baevres"),
    }
}