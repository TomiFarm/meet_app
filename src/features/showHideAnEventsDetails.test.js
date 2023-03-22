import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('When app is loaded the event details are hidden by default', ({ given, when, then }) => {

        let AppWrapper;
        
        given('the app has loaded', async () => {
            AppWrapper = await mount(<App />);
        });

        when('a user has not selected any event', () => {
            AppWrapper.update();
        });

        then('event details are not shown', () => {
            expect(AppWrapper.find('.eventDetails')).toHaveLength(0);
        });
    });

    test('Event details are shown when a user clicks details button', ({ given, when, then }) => {

        let AppWrapper;

        given('the app has loaded', async () => {
            AppWrapper = await mount(<App />);
        });

        when('a user clicks event details', () => {
            AppWrapper.update();
            AppWrapper.find('.showDetails').at(0).simulate('click');
        });

        then('the event details are shown', () => {
            expect(AppWrapper.find('.eventDetails')).toHaveLength(1);
        });
    });

    test('Event details are collapsed when a user closes the event details', ({ given, when, then }) => {

        let AppWrapper;

        given('an event details are shown', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find('.showDetails').at(0).simulate('click');
        });

        when('a user closes event details', () => {
            AppWrapper.find('.showDetails').at(0).simulate('click');
        });

        then('the event details are collapsed', () => {
            expect(AppWrapper.find('.eventdetails')).toHaveLength(0);
        });
    });
});