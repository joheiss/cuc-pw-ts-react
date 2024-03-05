Feature: As a user I can interact with stored values

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on stored values
    Then I retrieve the "first value" text and store it as "first value" in global variables
    And the "first value" should equal the "first value" stored in global variables
    And the "fourth value" should not equal the "first value" stored in global variables
    And the "fourth value" should contain the "first value" stored in global variables
