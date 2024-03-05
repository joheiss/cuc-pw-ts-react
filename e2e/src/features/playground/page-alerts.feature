Feature: As a user I can interact withpage alerts

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on page alerts
    Given the "error alert" should be displayed
    And the "error alert" should contain the text "This is an error alert — check it out!"
    And the "warning alert" should be displayed
    And the "warning alert" should contain the text "This is a warning alert — check it out!"
    And the "info alert" should be displayed
    And the "info alert" should contain the text "This is an info alert — check it out!"
    And the "success alert" should be displayed
    And the "success alert" should contain the text "This is a success alert — check it out!"
