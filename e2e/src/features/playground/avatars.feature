Feature: As a user I can interact with avatars

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on avatars
    Given there should be "2" "avatar" elements displayed
    And the "1st" "avatar" should be displayed
    And the "2nd" "avatar" should be displayed
    And the "3rd" "avatar" should not be displayed
    And the "small avatar" should be displayed
