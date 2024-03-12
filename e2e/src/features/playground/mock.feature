Feature: Intercept a REST api and mock the response

  @smoke @regression
  Scenario: Call a REST api to retrieve a set of users
    Given I am on the "playground" page
    When I wait for "500" milliseconds
    Then there should be "5" "rest fullname" elements displayed
    Then the "1st" "rest fullname" should contain the text "Leanne Graham"

  @regression
  Scenario: Mock a REST api to retrieve an empty list of users - no users
    Given the "users api" endpoint for "users" is mocked with "no users"
    And I am on the "playground" page
    Then the "rest fullname" should not be displayed

  @smoke @regression
  Scenario: Mock a REST api to retrieve a list of mock users
    Given the "users api" endpoint for "users" is mocked with "users"
    And I am on the "playground" page
    # When I scroll to the "basic rest"
    # And I wait for "10000" milliseconds
    Then there should be "5" "rest fullname" elements displayed
    And the "1st" "rest fullname" should contain the text "Hansi"
