Feature: As a user I can interact with login forms

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on login forms
    Given I fill in the "login email" input field with "$.TEST_EMAIL"
    And I fill in the "login password" input field with "$.TEST_PASSWORD"
    When after clicking the "login button" button the alert dialog should contain the message "Successfully logged in"

  @smoke @regression
  Scenario Outline: Interactions and assertions on login forms
    Given I fill in the "login email" input field with "$.TEST_EMAIL"
    And I fill in the "login password" input field with "$.TEST_PASSWORD"
    And the "login email" should contain the value "<email>"
    And the "login password" should contain the value "<password>"
    When after clicking the "login button" button the alert dialog should contain the message "Successfully logged in"

    @smoke @regression
    Examples: 
      | email                        | password     |
      | admin@testingtalkshub.com.au | Password1234 |

    @production
    Examples: 
      | email                        | password  |
      | admin@testingtalkshub.com.au | HansDampf |

  @smoke @regression
  Scenario Outline: Email validation
    Given I fill in the "login email" input field with "<email>"
    And I fill in the "login password" input field with "<password>"
    And the "email error" should contain the text "Please include an '@' in the email address."

    Examples: 
      | email           | password |
      | hansi           | secret   |
      | horsti.email.de | secret   |
