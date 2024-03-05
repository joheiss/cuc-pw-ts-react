Feature: As a user I can interact with radio buttons

  Background: 
    Given I am on the "home" page
    And I click the "playground" button
    And I am directed to the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on radio buttons
    Given the "female label" should contain the text "Female"
    And the "male label" should not contain the text "Female"
    And the "female" radio button should be checked
    And the "male" radio button should not be checked
    When I check the "male" radio button
    Then the "male" radio button should be checked
    And the "female" radio button should not be checked
