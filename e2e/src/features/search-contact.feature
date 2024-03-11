Feature: Contact Search

  Background: 
    Given I am on the "home" page

  @smoke @regression
  Scenario: Find an existing contact
    When I fill in the "search" input field with "Aphrodite Savage"
    Then there should be "1" "contact" elements displayed
    And the "contact" should be displayed

  @regression
  Scenario: Get no items message for non-existing contact
    When I fill in the "search" input field with "DoesNotExistIamSure"
    Then the "no items message" should be displayed
    And the "contact" should not be displayed
