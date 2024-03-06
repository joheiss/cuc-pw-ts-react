Feature: As a user I can refresh the browser and the correct page is displayed

  Background: 
    Given I am on the "home" page

  @dev @smoke @regression
  Scenario: Interactions and assertions on page refreshes
    Given I refresh the "home" page
    And I am directed to the "home" page
    When I click the "playground" button
    Then I am directed to the "playground" page
    And I refresh the "playground" page
    And I am directed to the "playground" page
