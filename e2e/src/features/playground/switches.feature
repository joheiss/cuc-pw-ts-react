Feature: As a user I can interact with switches

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on tables
    Given the "switch one" should be displayed
    And the "switch two" should be displayed
    And the "switch one" should not be disabled
    And the "switch two" should be disabled
    When I uncheck the "switch one" switch
    # And I check the "switch two" switch
    Then the "switch one" switch should not be checked
    And the "switch two" switch should not be checked
