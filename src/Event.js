import React, { Component } from 'react';

class Event extends Component {
    state = { collapsed: true };

    toggleCollapsed = () => {
        this.setState((state) => ({ collapsed: !state.collapsed }));
    };

    render() {
        const { event } = this.props;
        return <div className="event">
            <h4 className="eventSummary">{event.summary}</h4>
            <p className="eventDate">{new Date(event.start.dateTime).toString()}</p>
            <p className="eventLocation">@{event.summary} | {event.location}</p>
            {this.state.collapsed === false && (
                <div className="eventDetails">
                    <h4 className="eventAboutText">About event: </h4>
                    <a href={event.htmlLink} className="eventLink">See details on Google Calendar</a>
                    <p className="eventDescription">{event.description}</p>
                </div>
            )}
            <button className="showDetails" onClick={this.toggleCollapsed}>{this.state.collapsed === true ? "show" : "hide"} details</button>
        </div>;
    }
}

export default Event;