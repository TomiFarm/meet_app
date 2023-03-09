import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";
import { mockData } from '../mock-data';


describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('render number of events input', () => {
        expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
    });

    test('render number input correctly', () => {
        const query = NumberOfEventsWrapper.state('query');
        expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(query);
    });

    test('default number of shown events is 32', () => {
        expect(NumberOfEventsWrapper.state('query')).toBe(32);
    });

    test('change state when number input changes', () => {
        NumberOfEventsWrapper.setState({
            query: 1
        });
        const eventObject = { target: { value: 2}};
        NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('query')).toBe(2);
    });

    test('render input label correctly', () => {
        expect(NumberOfEventsWrapper.find('.numberLabel').text()).toBe('Number of events:');
    });

});