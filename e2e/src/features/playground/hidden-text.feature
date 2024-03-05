Feature: As a user I can interact with hidden text

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on hidden text
    Given the "show hide text" should be displayed
    And the "show hide text" should contain the text "This is visible"
    When I click the "show hide button" element
    Then the "show hide text" should not be displayed
