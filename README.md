Meet app

Meet app shows upcoming events in a city

Meet app uses serverless functions to get event data from Google Calendar API

Features:
- Filter events by city
- Show and Hide event's details
- Specify number of events shown
- Able to use the app when offline
- Data visualization

User stories:
- As a user I want to filter events by City so that I can see only events where I am planning to be
- As a user I want to see and hide events' details so that I can see more information on the specific events
- As a user I want to specify the number of events to view so that I don't have to scroll too much or that I can see a longer list of events
- As a user I want to use the app offline so that it is available to me also when I am not connected to internet
- As a user I want to see visualized data of upcoming events in a city so that I can plan ahead of my time

Scenarios:
- Given the app has loaded, when a user hasn't searched for a city, then show a list of all upcoming events
- Given a user has searched for a city, when a user selects a city, then a list of upcoming events in the selected city is shown
- Given the app has loaded, when a user has not selected any event, then event details are not shown
- Given the app has loaded, when a user clicks event details, then the event details are shown
- Given an event details are shown, when a user closes event details, then the event details are collapsed
- Given the app has loaded, when a user hasn's specified a number, then first 32 upcoming events are shown
- Given the app has loaded, when a user specifies a number, then a specified number of events are shown
- Given a user has opened the app previously, when a user opens the without internet connection, then a cached data is shown
- Given a user has opened the app without internet connection, when a user changes settings (city, time range), then a error is shown indicating the data is not available without internet connection
- Given the app has loaded, when a user selects to visualize, then a chart showing upcoming events is shown
