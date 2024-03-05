Feature: As a user I can interact with tables

  Background: 
    Given I am on the "playground" page

  @smoke @regression
  Scenario: Interactions and assertions on tables
    Given the "basic table" should be displayed
    And the "basic table" table should equal the following:
      | Frozen yoghurt     | 159 |   6 | 24 |   4 |
      | Ice cream sandwich | 237 |   9 | 37 | 4.3 |
      | Eclair             | 262 |  16 | 24 |   6 |
      | Cupcake            | 305 | 3.7 | 67 | 4.3 |
      | Gingerbread        | 356 |  16 | 49 | 3.9 |
    And the "basic table" table should not equal the following:
      | Frozen yoghurt     | 159 |   6 | 24 |   4 |
      | Ice cream sandwich | 237 |   9 | 37 | 4.3 |
      | Eclair             | 262 |  16 | 24 |   6 |
      | Cupcake            | 305 | 3.4 | 67 | 4.3 |
      | Gingerbread        | 356 |  16 | 49 | 3.9 |
