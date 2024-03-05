Feature: As a user I can interact with tooltips

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on tooltips
    When I hover over the "tooltip" element
    Then the "tooltip" "title" attribute should contain the text "This is a tooltip"
