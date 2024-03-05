Feature: As a user I can interact with test areas

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on text areas
    Given the "textarea" should be displayed
    When I click the "textarea" element
    And the "textarea" should contain the text "Testing Talks Hub has been established"
    And I fill in the "textarea" input field with "Let's type something in here ..."
    # Then the "textarea" should contain the value "Let's type something in here ..."
