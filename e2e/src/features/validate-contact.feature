Feature: Contact validation

  Background: 
    Given I am on the "create contact" page
    And the "create contact header" should contain the text "Create Contact"

  @smoke @regression
  Scenario: Prevent contact to be saved without a name
    When I click the "save" button
    Then the "error message" should be displayed
    And the "error message" should contain the text "The "name" field can't be empty."

  @smoke @regression
  Scenario: Prevent contact to be saved without a phone
    When I fill in the "name" input field with random "name"
    And I click the "save" button
    Then the "error message" should be displayed
    And the "error message" should contain the text "The "phone" field can't be empty."

  @smoke @regression
  Scenario: Prevent contact to be saved without a street
    When I fill in the "name" input field with random "name"
    And I fill in the "phone" input field with random "phoneNumber"
    And I click the "save" button
    Then the "error message" should be displayed
    And the "error message" should contain the text "The "street" field can't be empty."

  @smoke @regression
  Scenario: Prevent contact to be saved without a city
    When I fill in the "name" input field with random "name"
    And I fill in the "phone" input field with random "phoneNumber"
    And I fill in the "street" input field with random "street"
    And I click the "save" button
    Then the "error message" should be displayed
    And the "error message" should contain the text "The "city" field can't be empty."

  @regression
  Scenario: Allow contact to be saved if all fields are filled
    When I fill in the "name" input field with random "name"
    And I fill in the "phone" input field with random "phoneNumber"
    And I fill in the "street" input field with random "street"
    And I fill in the "city" input field with random "city"
    And I click the "save" button
    Then the "error message" should not be displayed
