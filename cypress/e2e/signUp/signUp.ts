const { Given, When, Then} = require("@badeball/cypress-cucumber-preprocessor")
import signUpPO from "../../pageObjects/signUpPage"
import testdata from "../../fixtures/testdata.json"
import GenerateUtils from "../../utils/generate"
import errorMessage from "../../fixtures/errorMessage.json"

let email : string = GenerateUtils.generateEmail()

Given('user go to autobahn security sign up page',()=>{
    cy.visit('/signup')
})

When('user input email',()=>{
    signUpPO.elements.emailTextfield().type(email)
})
        
Then('verify {string} modal',(modalName: string)=>{
    switch(modalName){
        case 'sign up':
            signUpPO.verifySignupModal()
            break;

        case 'welcome':
            signUpPO.verifyWelcomeModal()
            break

        default:
            throw new Error(errorMessage.switchCaseError)
    }
})

When('user click {string}',(locatorName: string)=>{
    switch(locatorName){
        case 'email textfield':
            signUpPO.elements.emailTextfield().click()
            break;

        case 'password textfield':
            signUpPO.elements.passwordTextfield().click()
            break

        case 'sign up':
            signUpPO.elements.signupBtn().click()
            break

        case 'first name':
            signUpPO.elements.firstNameTextfield().click()
            break

        case 'last name':
            signUpPO.elements.lastNameTextfield().click()
            break

        case 'industry':
            signUpPO.elements.industryDropdown().click()
            break

        case 'start using Autobahn':
            signUpPO.elements.startUsingAutobahnBtn().click()
            break

        case 'country code option':
            signUpPO.elements.selectedCountry().click()
            break

        default:
            throw new Error(errorMessage.switchCaseError)
    }
})

When('user click random in {string} modal',(modalName: string)=>{
    if(modalName== "sign up"){
        signUpPO.elements.signUpHeaderTitle().click()
    }else if(modalName == 'welcome'){
        signUpPO.elements.welcomeTitle().click()
    }else{
        throw new Error(errorMessage.ifElseError)
    }
})

Then('verify warning message for {string}',(locatorName: string)=>{
    if(locatorName== 'phone number'){
        signUpPO.elements.phoneNumberWarning().should('be.visible')
    }else{
        signUpPO.textfieldWarningMessage(locatorName)
    }
})

When('user input password that have {string} strength',(passCondition: string)=>{
    let password : string
    switch(passCondition){
        case 'weak':
            password = testdata.weakPass
            break;

        case 'average':
            password = testdata.averagePass
            break;

        case 'strong':
            password = testdata.strongPass
            break

        case 'very strong':
            password = testdata.veryStrongPass
            break

        default:
            throw new Error(errorMessage.switchCaseError)
    }
    cy.log(passCondition)
    signUpPO.elements.passwordTextfield().type(password)
})

Then('verify behavior if password have {string} strength',(passCondition: string)=>{
    switch(passCondition){
        case 'weak':
            cy.wrap(testdata.indexPassInvalid).each((num, i, array)=>{
                signUpPO.passwordRequirement(testdata.passwordRequirement[testdata.indexPassInvalid[i]]).should('not.have.class','is-fulfilled')
                signUpPO.passwordRequirement(testdata.passwordRequirement[testdata.indexPassValid[i]]).should('have.class','is-fulfilled')
            })
            signUpPO.elements.weakStrengthBar().should('be.visible')
            break;

        case 'average':
            cy.wrap(testdata.passwordRequirement).each((num, i, array)=>{
                signUpPO.passwordRequirement(testdata.passwordRequirement[i]).should('not.exist')
            })
            signUpPO.elements.averagePassWarning().should('be.visible')
            signUpPO.elements.averageStrengthBar().should('be.visible')
            break;

        case 'strong':
            cy.wrap(testdata.passwordRequirement).each((num,i,array)=>{
                signUpPO.passwordRequirement(testdata.passwordRequirement[i]).should('not.exist')
            })
            signUpPO.elements.strongStrengthBar().should('be.visible')
            break

        case 'very strong':
            cy.wrap(testdata.passwordRequirement).each((num,i,array)=>{
                signUpPO.passwordRequirement(testdata.passwordRequirement[i]).should('not.exist')
            })
            signUpPO.elements.veryStrongStrengthBar().should('be.visible')
            break

        default:
            throw new Error(errorMessage.switchCaseError)

    }
})

When('fill up {string} modal form',(modalName: string)=>{
    let firstName : string = GenerateUtils.generateRandomName(8)
    let lastName : string = GenerateUtils.generateRandomName(8)
    let phoneNumber : string = GenerateUtils.generateRandoPhoneNumber()
    switch(modalName){
        case 'sign up':
            signUpPO.signUp(email, testdata.strongPass)
            break

        case 'welcome':
            signUpPO.fillUpWelcome(firstName, lastName, testdata.countryName, phoneNumber)
            break

        default:
            throw new Error(errorMessage.switchCaseError)
    }
})

Then('verify user will see verify your email modal',()=>{
    signUpPO.verifyEmailModal()
})

When('user select {string}', (countryName: string)=>{
    signUpPO.elements.countryOption().contains(countryName).click()
})

When('user input {string} phone number',(phoneCondition: string)=>{
    let phoneNumber : string
    if(phoneCondition == 'invalid'){
        phoneNumber = testdata.invalidPhone
    }else if(phoneCondition == 'valid'){
        phoneNumber = testdata.validPhone
    }
    signUpPO.elements.phoneNumberTextfield().type(phoneNumber)
})