Feature: As a user I can interact with drop down menus

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on drop down menus
    Given the "dropdown button" should be displayed
    When I click the "dropdown button" button
    Then the "profile" should be displayed
    And the "profile" should contain the text "Profile"
    And the "my-account" should be displayed
    And the "my-account" should contain the text "My account"
    And the "logout" should be displayed
    And the "logout" should contain the text "Logout"
    # the menu disappears as soon as a menu item is selected / clicked
    And I click the "profile" button
    And the "profile" should not be displayed
