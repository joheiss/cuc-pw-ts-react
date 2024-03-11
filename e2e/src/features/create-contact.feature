Feature: Create contacts

  @smoke @regression
  Scenario: Sucessfully create a new contact
    Given I am on the "home" page
    When I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    And I fill in the "name" input field with "Hansi Hampelmann"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input field with "+49 777 9876543"
    And I fill in the "street" input field with "Holzweg 1"
    And I fill in the "city" input field with "Schwabach"
    And I click the "save" button
    And I am directed to the "home" page
    And I fill in the "search" input field with "Hampelmann"
    And the "full name label" should contain the text "Name:"
    And the "name" should be equal to the text "Hansi Hampelmann"
    And the "name" should not be equal to the text "Hansi Hampel"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "Holzweg 1"
    And the "edit" should be displayed
    And the "delete" should be displayed

  @ignore
  Scenario: Navigate to the create contract page
    Given I am on the "home" page
    When I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"

  @ignore
  Scenario: Create a new contract
    Given I am on the "create contact" page
    When I fill in the "name" input field with "Hansi Hampelmann"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input field with "+49 777 9876543"
    And I fill in the "street" input field with "Holzweg 1"
    And I fill in the "city" input field with "Schwabach"
    And I click the "save" button
    Then I am directed to the "home" page

  @ignore
  Scenario: Search the newly created contact
    Given I am on the "home" page
    When I fill in the "search" input field with "Hampelmann"
    Then the "full name label" should contain the text "Name:"
    And the "name" should be equal to the text "Hansi Hampelmann"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "Holzweg 1"
    And the "edit" should be displayed
    And the "delete" should be displayed

  @ignore
  Scenario: Search an existing contact
    Given I am on the "home" page
    When I fill in the "search" input field with "Aphrodite"
    Then the "full name label" should contain the text "Name:"
    And the "name" should be equal to the text "Aphrodite Savage"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Female"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "911-8528 Mauris"
    And the "edit" should be displayed
    And the "delete" should be displayed

 @regression
  Scenario: Newly created contacts don't persist after a page refresh
    Given I am on the "home" page
    When I click the "create" button
    Then I am directed to the "create contact" page
    And the "create contact header" should contain the text "Create Contact"
    And I fill in the "name" input field with "Hansi Hampelmann"
    And I select the "Male" option from the "gender"
    And I fill in the "phone" input field with "+49 777 9876543"
    And I fill in the "street" input field with "Holzweg 1"
    And I fill in the "city" input field with "Schwabach"
    And I click the "save" button
    # check the newly entered data
    And I am directed to the "home" page
    And I fill in the "search" input field with "Hampelmann"
    And the "full name label" should contain the text "Name:"
    And the "name" should be equal to the text "Hansi Hampelmann"
    And the "name" should not be equal to the text "Hansi Hampel"
    And the "gender label" should contain the text "Gender:"
    And the "gender" should contain the text "Male"
    And the "address label" should contain the text "Address:"
    And the "address" should contain the text "Holzweg 1"
    And the "edit" should be displayed
    And the "delete" should be displayed
    # --------------------
    # now refresh the page
    # --------------------
    And I refresh the "home" page
    And I am directed to the "home" page
    And I fill in the "search" input field with "Hampelmann"
    And the "contact" should not be displayed
