Feature: This is for testing sign up feature

    Scenario: Verify sign up modal
        Given user go to autobahn security sign up page
        Then verify 'sign up' modal

    Scenario: Verify error message when user not input <textfield>
        Given user go to autobahn security sign up page
        When user click '<textfield> textfield'
        And user click random in 'sign up' modal
        Then verify warning message for '<textfield>'
        Examples:
            | textfield |
            | email     |
            | password  |

    Scenario: Verify if user input password that have <condition> strength
        Given user go to autobahn security sign up page
        When user input password that have '<condition>' strength
        Then verify behavior if password have '<condition>' strength
        Examples:
            | condition   |
            | weak        |
            | average     |
            | strong      |
            | very strong |

    Scenario: User successfuly go to welcome modal
        Given user go to autobahn security sign up page
        When user input email
        And user input password that have 'strong' strength
        Then verify behavior if password have 'strong' strength
        When user click 'sign up'
        Then verify 'welcome' modal

    Scenario: Verify error message when user not input <element> in welcome modal
        Given user go to autobahn security sign up page
        When fill up 'sign up' modal form
        And user click 'sign up'
        Then verify 'welcome' modal
        When user click '<element>'
        And user click random in 'welcome' modal
        Then verify warning message for '<element>'
        Examples:
            | element    |
            | first name |
            | last name  |
            | industry   |

    Scenario: Verify error message when user input invalid phone number
        Given user go to autobahn security sign up page
        When fill up 'sign up' modal form
        And user click 'sign up'
        Then verify 'welcome' modal
        When user click 'country code option'
        And user select 'Indonesia'
        And user input 'invalid' phone number
        Then verify warning message for 'phone number'

    Scenario: Verify user successfuly sign up in Autobahn website
        Given user go to autobahn security sign up page
        When fill up 'sign up' modal form
        And user click 'sign up'
        Then verify 'welcome' modal
        When fill up 'welcome' modal form
        And user click 'start using Autobahn'
        Then verify user will see verify your email modal