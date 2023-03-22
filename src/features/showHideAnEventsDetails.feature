Feature: Show and Hide event's details

Scenario: When app is loaded the event details are hidden by default
Given the app has loaded
When a user has not selected any event
Then event details are not shown

Scenario: Event details are shown when a user clicks details button
Given the app has loaded
When a user clicks event details
Then the event details are shown

Scenario: Event details are collapsed when a user closes the event details
Given an event details are shown
When a user closes event details
Then the event details are collapsed