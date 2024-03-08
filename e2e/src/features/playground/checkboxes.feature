Feature: As a user I can interact with checkboxes

  Background: 
    Given I am on the "playground" page

  @dev @smoke @regression
  Scenario: Interactions and assertions on checkboxes
    Given the "blue" checkbox should not be checked
    And the "purple" checkbox should not be checked
    And the "green" checkbox should not be checked
    And the "grey" checkbox should not be checked
    And the "red" checkbox should not be checked
    When I check the "blue" checkbox
    And I check the "purple" checkbox
    And I uncheck the "blue" checkbox
    Then the "blue" checkbox should not be checked
    And the "purple" checkbox should be checked
    And the "green" checkbox should not be checked
    And the "grey" checkbox should not be checked
    And the "red" checkbox should not be checked
