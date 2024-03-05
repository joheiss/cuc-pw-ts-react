Feature: As a user I can interact with buttons on index

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on buttons with index
    When I click the "2nd" "my-button" button
    And I click the "1st" "my-button" button
    # And I click the "my-button" button
    Then the "1st" "my-button" should contain the text "One"
    And the "3rd" "my-button" should contain the text "Three"
