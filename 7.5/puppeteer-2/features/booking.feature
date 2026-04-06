Feature: Booking tickets

  Background:
    Given user is on main page

  Scenario: Should book a ticket successfully
    When user selects a day
    And user selects a session
    And user selects an available seat
    Then booking button is enabled
    When user clicks booking button
    Then confirmation page is displayed
    When user clicks get code button
    Then electronic ticket is displayed

  Scenario: Should not book without seat selection
    When user selects a day
    And user selects a session
    Then booking button is disabled