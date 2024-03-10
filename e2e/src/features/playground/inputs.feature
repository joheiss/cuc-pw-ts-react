Feature: As a user I can interact with auto-complete inputs

  Background: 
    Given I am on the "home" page
    And I click the "playground" button
    And I am directed to the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on auto-complete inputs
    When I fill in the "movies" input field with "The G"
    And I click the "godfather" button
    Then the "movies" should contain the value "The Godfather"
    And the "movies" should not contain the value "The Godfather: Part II"

  @smoke @regression
  Scenario Outline: Interactions and assertions on auto-complete inputs
    When I fill in the "movies" input field with "<search>"
    And I click the "<movie button>" button
    Then the "movies" should contain the value "<movie>"
    And the "movies" should not contain the value "The Godfather: Part II"

    Examples: 
      | search | movie button | movie           |
      | The G  | godfather    | The Godfather   |
      | The D  | dark knight  | The Dark Knight |

  @smoke @regression
  Scenario: Interactions and assertions on input fields
    Then the "required" should equal the value "Testing"
    And the "required" should not equal the value "Testi"
    And the "required" should not be disabled
    And the "disabled" should be disabled
    And I fill in the "required" input field with "This should work"
    And the "required" should contain the value "This should work"

  @smoke @regression
  Scenario: Interactions and assertions on input validations
    Then the "validated label" should contain the text "Error"
    And the "error message" should contain the text "Incorrect entry"
    And the "validated" should contain the value "Testing Talks Online"
