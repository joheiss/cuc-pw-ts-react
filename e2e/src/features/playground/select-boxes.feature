Feature: As a user I can interact withselect boxes

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on select boxes and options
    Given the "select box" should be displayed
    When I select the "20" option from the "select box"
    Then the "select box" should equal the value "20"
