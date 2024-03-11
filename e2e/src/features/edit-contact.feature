Feature: Editing of a contact

  Background: 
    Given I am on the "home" page
    And I fill in the "search" input field with "Aphrodite Savage"
    And there should be "1" "contact" elements displayed

  @smoke @regression
  Scenario: Sucessfully edit an existing contact
    When I click the "edit" button
    # And I wait for "3000" milliseconds
    Then I am directed to the "edit contact" page
    And the "edit contact form" should be displayed
    And I fill in the "name" input field with "Hans Wurst"
    And I select the "Male" option from the "gender"
    And I click the "save" button
    And I fill in the "search" input field with "Hans Wurst"
    And there should be "1" "contact" elements displayed
    And the "gender" should contain the text "Male"
