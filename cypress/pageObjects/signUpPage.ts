import testdata from '../fixtures/testdata.json'
import errorMessage from '../fixtures/errorMessage.json'

class signUpPage{
    elements = {
        //sign up modal
        signUpModal: ()=> cy.get('div[class="confirmation"]'),
        signUpHeaderTitle: ()=> cy.get('h1[class="heading"]').contains('Start a free 14-day trial'),
        emailTextfield: ()=> cy.get('input[placeholder="Work email*"]'),
        passwordTextfield: ()=> cy.get('input[placeholder="Password*"]'),
        weakStrengthBar: ()=> cy.get('div[class="bar bg-primary"][style="flex-basis: 0%;"]'),
        averageStrengthBar: ()=> cy.get('div[class="bar bg-warning"][style="flex-basis: 50%;"]'),
        strongStrengthBar: ()=> cy.get('div[class="bar bg-success"][style="flex-basis: 75%;"]'),
        veryStrongStrengthBar: ()=> cy.get('div[class="bar bg-success full"][style="flex-basis: 100%;"]'),
        passwordRequirement: ()=> cy.get('div[data-v-d580ca2c]'),
        averagePassWarning: ()=> cy.get('div[class="feedback-suggestion"]').find('li').contains('Add another word or two. Uncommon words are better.'),
        signupBtn: ()=> cy.get('p[class="button-text paragraph button-large"]').contains('Sign up'),

        //welcome modal
        welcomeTitle: ()=> cy.get('h1[class="heading"]').contains('Welcome!'),
        firstNameTextfield: ()=> cy.get('input[placeholder="First name*"]'),
        lastNameTextfield: ()=> cy.get('input[placeholder="Last name*"]'),
        industryDropdown: ()=> cy.get('div[name="industry"]'),
        industryOptionLocator: ()=> 'div[data-v-07a11256][class="items"]',
        selectedCountry: ()=> cy.get('div[class="iti__selected-flag"]'),
        countryOption: ()=> cy.get('span[class="iti__country-name"]'),
        phoneNumberWarning: ()=> this.elements.selectedCountry().parent().parent().siblings().contains('Please enter a valid phone number'),
        phoneNumberTextfield: ()=> cy.get('input[placeholder="Phone number*"]'),
        startUsingAutobahnBtn: ()=> cy.get('p[class="button-text paragraph button-large"]').contains('Start using Autobahn'),

        // verify email modal
        verifyEmailTitle: ()=> cy.get('h1[class="heading"]').contains('Verify Your Email'),
        paperplaneIcon: ()=> cy.get('div[class="paper-plane-icon-wrapper"]'),
        verifyEmailInstruction: ()=> cy.get('p[id="instruction"]').contains('Please follow the instructions in the verification email to activate your account. Your first scan will start automatically after clicking the verification link.'),
        resendVerificationLinkBtn: ()=> cy.get('p[class="button-text paragraph button-large"]').contains('Resend Verification Link')
    }
    verifySignupModal(){
        this.elements.signUpModal().should('be.visible')
        this.elements.signUpHeaderTitle().should('be.visible')
        this.elements.emailTextfield().should('be.visible')
        this.elements.passwordTextfield().should('be.visible')
        this.elements.signupBtn().should('be.visible')
    }
    passwordRequirement(requirement: string){
        return this.elements.passwordRequirement().contains(requirement)
    }
    verifyWelcomeModal(){
        this.elements.welcomeTitle().should('be.visible')
        this.elements.firstNameTextfield().should('be.visible')
        this.elements.lastNameTextfield().should('be.visible')
        this.elements.industryDropdown().should('be.visible')
        this.elements.selectedCountry().should('be.visible')
    }
    signUp(email: string, password: string){
        this.elements.emailTextfield().type(email)
        this.elements.passwordTextfield().type(password)
    }
    textfieldWarningMessage(textfieldName: string){
        let elementLocator: any
        switch(textfieldName){
            case 'email':
                elementLocator = this.elements.emailTextfield().siblings()
                break

            case 'password':
                elementLocator = this.elements.passwordTextfield().parent().siblings()
                break

            case 'first name':
                elementLocator = this.elements.firstNameTextfield().siblings()
                break

            case 'last name':
                elementLocator = this.elements.lastNameTextfield().siblings()
                break

            case 'industry':
                elementLocator = this.elements.industryDropdown().parent().siblings()
                break

            default:
                throw new Error(errorMessage.switchCaseError)

        }
        elementLocator.contains('Field cannot be empty')
    }
    fillUpWelcome(firstName: string, lastName: string, countryName: string, phoneNumber: string){
        this.elements.firstNameTextfield().type(firstName)
        this.elements.lastNameTextfield().type(lastName)
        this.elements.industryDropdown().click()
        cy.randomPickInElements(this.elements.industryOptionLocator())
        this.elements.selectedCountry().click()
        this.elements.countryOption().contains(countryName).click()
        this.elements.phoneNumberTextfield().type(phoneNumber)
    }
    verifyEmailModal(){
        this.elements.verifyEmailTitle().should('be.visible')
        this.elements.paperplaneIcon().should('be.visible')
        this.elements.verifyEmailInstruction().should('be.visible')
        this.elements.resendVerificationLinkBtn().should('be.visible')
    }
}

const signUpPO = new signUpPage()
export default signUpPO