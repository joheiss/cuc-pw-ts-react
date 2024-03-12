Feature: Generate accessibility reports across our web site

  @regression @a11y
  Scenario: Generate a11y report for the Home page
    Given I am on the "home" page
    And I generate the AXE accessibility report

  @regression @a11y
  Scenario: Generate a11y report for the Create Contact page
    Given I am on the "create contact" page
    And I generate the AXE accessibility report

  @dev @regression @a11y
  Scenario: Generate a11y report for the Edit Contact page
    Given I am on the "home" page
    When I click the "1st" "edit" button
    Then I am directed to the "edit contact" page
    And I generate the AXE accessibility report

  @regression @a11y
  Scenario: Generate a11y report for the Playground page
    Given I am on the "playground" page
    And I generate the AXE accessibility report
