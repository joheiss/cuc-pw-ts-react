Feature: As a user I can interact with IFrames

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on iframes
    When I scroll to the "basic iframe"
    And I fill in the "search" input field on the "basic iframe" iframe with "Abraham Perry"
    Then the "contact" on the "basic iframe" iframe should be displayed
    And the "full name label" on the "basic iframe" iframe should contain the text "Name:"
    And the "name" on the "basic iframe" iframe should equal the text "Abraham Perry"
    And the "name" on the "basic iframe" iframe should not equal the text "Abraham"
