Feature: As a user I can interact with browser alerts

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on browser alerts
    When I click the "alert" button
    Then I click accept on the alert dialog
    And I click the "alert" button
    And I click dismiss on the alert dialog
