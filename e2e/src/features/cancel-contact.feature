Feature: Cancel creation of a new contact

  @smoke @regression
  Scenario: Sucessfully cancel the creation of a new contact
    Given I am on the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    When I fill in the "name" input field with random "name"
    And I retrieve the "name" value and store it as "fakeName" in global variables
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input field with random "phoneNumber"
    And I fill in the "street" input field with random "street"
    And I fill in the "city" input field with random "city"
    And I click the "cancel" button
    Then I am directed to the "home" page
    And I fill in the "search" input field with the value from global variable "fakeName"
    And the "no items message" should be displayed

@regression
  Scenario: Sucessfully cancel the editing of a contact
    Given I am on the "home" page
    And I fill in the "search" input field with "Aphrodite Savage"
    And there should be "1" "contact" elements displayed
    And I click the "edit" button
    And I retrieve the "name" value and store it as "originalName" in global variables
    And I retrieve the "gender" value and store it as "originalGender" in global variables
    And I retrieve the "phone" value and store it as "originalPhone" in global variables
    And I retrieve the "street" value and store it as "originalStreet" in global variables
    And I retrieve the "city" value and store it as "originalCity" in global variables
    When I fill in the "name" input field with random "name"
    And I retrieve the "name" value and store it as "editedName" in global variables
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input field with random "phoneNumber"
    And I fill in the "street" input field with random "street"
    And I fill in the "city" input field with random "city"
    And I click the "cancel" button
    Then I am directed to the "home" page
    And I fill in the "search" input field with the value from global variable "editedName"
    And the "no items message" should be displayed
    And I fill in the "search" input field with the value from global variable "originalName"
    And there should be "1" "contact" elements displayed
    And I click the "edit" button
    And the "name" should contain the "originalName" stored in global variables
    And the "phone" should contain the "originalPhone" stored in global variables
    And the "street" should contain the "originalStreet" stored in global variables
    And the "city" should contain the "originalCity" stored in global variables
    And I click the "cancel" button
