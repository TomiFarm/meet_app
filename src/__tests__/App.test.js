import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });
    
    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents component', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });

});

describe('<App /> integration', () => {
    let AppWrapper;

    // beforeEach(()=> {
    //     AppWrapper = mount(<App />);
    // });

    // afterEach(() => {
    //     AppWrapper.unmount();
    // });

    test('App passes "events"state as a prop to EventList', () => {
        AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined);
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount();
        
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by user', async () => {
        AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.lenght));
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get a list of all events when user selects "See all cities"', async () => {
        AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

    test('App passes "eventCount" state as a prop to NumberOfEvents', () => {
        AppWrapper = mount(<App />);
        const AppEventCountState = AppWrapper.state('eventCount');
        expect(AppEventCountState).not.toEqual(undefined);
        expect(AppWrapper.find(NumberOfEvents).props().eventCount).toEqual(AppEventCountState);
        AppWrapper.unmount();
    });
    
    test('change the eventCount state matching the eventCount selected by user', async () => {
        AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        const numberInput = NumberOfEventsWrapper.find('.numberInput');
        numberInput.simulate('change', {target: {value: 10}});
        await getEvents();
        expect(AppWrapper.state('eventCount')).toBe(10);
        AppWrapper.unmount();
    });

    test('The number of events rendered matches the eventCount state', async () => {
        const AppWrapper = mount(<App />);
        const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
        // const EventListWrapper = AppWrapper.find(EventList);
        await NumberOfEventsWrapper.instance().handleInputChanged({ target: { value: 1 } });
        await getEvents();
        expect(AppWrapper.state('events')).toHaveLength(1);
        AppWrapper.unmount();
    });
});