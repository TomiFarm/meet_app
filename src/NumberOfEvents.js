import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        query: 32
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({query: value});
    }

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