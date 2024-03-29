Feature: As a user I expect to be able to navigate to the home page

  @smoke @regression
  Scenario: As a user I expect to be able to see contacts
    Given I am on the "home" page
    Then the "header logo" should be displayed
    And the "contacts header" should contain the text "Contacts"

  @regression
  Scenario: As a user I don't expect to see a contact that doesn't exist
    Given I am on the "home" page
    When I fill in the "search" input field with "Blödsinn"
    Then the "contact" should not be displayed
