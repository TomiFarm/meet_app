Feature: Specify number of events shown

Scenario: 32 upcoming events are shown by default
Given the app has loaded
When a user hasn's specified a number
Then 32 upcoming events are shown
 
Scenario: User can specify the number of events shown
Given the app has loaded
When a user specifies a number
Then a specified number of events are shown