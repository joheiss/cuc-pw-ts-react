Feature: As a user I can interact with links

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on links
    When I click the "primary" button
    Then the "primary" should contain the text "Primary"
    And the "secondary" should be disabled
    And the "secondary" should be equal to the text "Disabled"
    And I click the "third" link
    And the "third" should contain the text "Link"
