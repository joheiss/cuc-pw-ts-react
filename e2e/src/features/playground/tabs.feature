Feature: As a user I can interact with new browser tabs

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on new browser tabs
    # When I click the "new tab" button and wait briefly
    When I click the "new tab" button and wait until page is loaded
    # And I wait for "1200" milliseconds
    # And I wait for the page to be loaded
    Then the "2nd" tab should contain the title "Contacts"
    Then the "2nd" tab should not contain the title "Xontacts"
    And the "1st" tab should contain the title "Playground"
    And I fill in the "search" input field on the "2nd" tab with "Abraham"
    And the "contact" on the "2nd" tab should be displayed
    And the "full name label" on the "2nd" tab should contain the text "Name"
    And the "name" on the "2nd" tab should equal the text "Abraham Perry"
    And I fill in the "search" input field on the "2nd" tab with "Dummvogel"
    And the "contact" on the "2nd" tab should not be displayed
