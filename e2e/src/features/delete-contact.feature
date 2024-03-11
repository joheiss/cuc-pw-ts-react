Feature: Deletion of a contact

  Background: 
    Given I am on the "home" page
    When I fill in the "search" input field with "Savage"
    Then there should be "1" "contact" elements displayed

  @smoke @regression
  Scenario: Delete an existing contact
    When I fill in the "search" input field with "Savage"
    Then there should be "1" "contact" elements displayed
    # -------------------------------------------------------------------------------------------
    # CAUTION: the alert must be accepted or dismissed BEFORE the button is clicked -- STRANGE ...
    # -------------------------------------------------------------------------------------------
    And I click accept on the alert dialog
    And I click the "delete" button
    And the "no items message" should be displayed

@regression
  Scenario: Back off from deleting an existing contact
    When I fill in the "search" input field with "Savage"
    Then there should be "1" "contact" elements displayed
    # -------------------------------------------------------------------------------------------
    # CAUTION: the alert must be accepted or dismissed BEFORE the button is clicked -- STRANGE ...
    # -------------------------------------------------------------------------------------------
    And I click dismiss on the alert dialog
    And I click the "delete" button
    And there should be "1" "contact" elements displayed


@regression
  Scenario: Delete the 3rd contact (of 4)
    When I fill in the "search" input field with "ali"
    Then there should be "4" "contact" elements displayed
    # -------------------------------------------------------------------------------------------
    # CAUTION: the alert must be accepted or dismissed BEFORE the button is clicked -- STRANGE ...
    # -------------------------------------------------------------------------------------------
    And I click accept on the alert dialog
    And I click the "3rd" "delete" button
    And there should be "3" "contact" elements displayed
    And  I fill in the "search" input field with "Benedict Bates"
    And the "no items message" should be displayed
