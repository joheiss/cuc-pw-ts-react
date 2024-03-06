Feature: As a user I can interact with cards

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on cards
    Given the "card header" should be displayed
    And the "card main" should contain the text "Automation"
    And the "card type" should be equal to the text "noun"
    And the "card overview" should contain the text "Automate the execution of tests"
    When I click the "card action" element
    Then the "card header" should be displayed
