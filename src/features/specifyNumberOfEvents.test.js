import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('32 upcoming events are shown by default', ({ given, when, then }) => {

        let AppWrapper;

        given('the app has loaded', async () => {
            AppWrapper = await mount(<App />);
        });

        when('a user hasn\'s specified a number', () => {
            AppWrapper.update();
        });

        then('32 upcoming events are shown', () => {
            expect(AppWrapper.state('eventCount')).toBe(32);
        });
    });

    test('User can specify the number of events shown', ({ given, when, then }) => {

        let AppWrapper;

        given('the app has loaded', async () => {
            AppWrapper = await mount(<App />);
        });

        when('a user specifies a number', () => {
            AppWrapper.update();
            let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
            NumberOfEventsWrapper.find('.numberInput').simulate('change', { target: { value: 2 }});
        });

        then('a specified number of events are shown', () => {
            expect(AppWrapper.find('.event')).toHaveLength(2);
        });
    });
});