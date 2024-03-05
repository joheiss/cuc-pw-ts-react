Feature: As a user I can interact with new browser windows

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on new browser windows
    When I click the "open window" button
    And I wait for "300" milliseconds
    Then the "2nd" window should contain the title "Contacts"
    And the "1st" window should contain the title "Playground"
    And I fill in the "search" input field on the "2nd" window with "Abraham"
    And the "contact" on the "2nd" window should be displayed
    And the "full name label" on the "2nd" window should contain the text "Name"
    And the "name" on the "2nd" window should equal the text "Abraham Perry"
    And I fill in the "search" input field on the "2nd" window with "Dummvogel"
    And the "contact" on the "2nd" window should not be displayed
