import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        query: 32,
        errorText: ''
    };

    handleInputChanged = (numberOfEvents) => {
        const value = numberOfEvents.target.value;
        if(value > 0 && value < 100) {
            this.setState({query: value, errorText: ''});
            this.props.updateEvents(null, value);
        } else {
            return this.setState({errorText: 'Please select a number between 1 and 99'});
        }
    };

    render() {
        
        return (
            <div className="numberOfEvents">
                <ErrorAlert text={this.state.errorText} />
                <label className="numberLabel">Number of events:</label>
                <input
                    type="number"
                    className="numberInput"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                >
                </input>
            </div>
        );
    }
}

export default NumberOfEvents;