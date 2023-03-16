import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        query: 32
    };

    handleInputChanged = (numberOfEvents) => {
        const value = numberOfEvents.target.value;
        this.setState({query: value});
        this.props.updateEvents(null, value);
    };

    render() {
        
        return (
            <div className="numberOfEvents">
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