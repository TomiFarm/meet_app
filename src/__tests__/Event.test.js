import React from "react";
import { shallow } from "enzyme";
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper;
    const event = mockData[0];

    beforeAll(() => {
        EventWrapper = shallow(<Event event={event} />);
    });

    beforeEach(() => {
        EventWrapper.setState({ collapsed: true });
    });
    
    test('Render event', () => {
        expect(EventWrapper.find('.event')).toHaveLength(1);
    });

    test('render event summary', () => {
        expect(EventWrapper.find('.eventSummary')).toHaveLength(1);
    });

    test('render event date&time', () => {
        expect(EventWrapper.find('.eventDate')).toHaveLength(1);
    });

    test('render event location', () => {
        expect(EventWrapper.find('.eventLocation')).toHaveLength(1);
    });

    test('render showDetails button', () => {
        expect(EventWrapper.find('.showDetails')).toHaveLength(1);
    });

    test('render event title correctly', () => {     
        expect(EventWrapper.find('.eventSummary').text()).toBe(event.summary);
    });

    test('render date&time correctly', () => {
        expect(EventWrapper.find('.eventDate').text()).toBe(new Date(event.start.dateTime).toString());
    });

    test('render event location correctly', () => {
        expect(EventWrapper.find('.eventLocation').text()).toBe(`@${event.summary} | ${event.location}`);
    });

    test('render showDetails button correctly', () => {
        expect(EventWrapper.find('.showDetails').text()).toBe('show details');
    });

    test('event details are collapsed by default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });

    test('render event details when show details is clicked', () => {
        EventWrapper.find('.showDetails').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
        expect(EventWrapper.find('.eventDetails')).toHaveLength(1);
    });

    test('render event details correctly when show details is clicked', () => {
        EventWrapper.find('.showDetails').simulate('click');
        expect(EventWrapper.find('.eventAboutText')).toHaveLength(1);
        expect(EventWrapper.find('.eventAboutText').text()).toBe('About event: ');
        expect(EventWrapper.find('.eventLink').text()).toBe('See details on Google Calendar');
        expect(EventWrapper.find('.eventDescription').text()).toBe(event.description);
        expect(EventWrapper.find('.showDetails').text()).toBe('hide details');
    });
});