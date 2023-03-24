import React, { Component } from 'react';
import Event from './Event';
import { WarningAlert } from './Alert';

class EventList extends Component {
    state = {
        offlineWarningText: ''
    };

    render() {
        const { events } = this.props;

        const online = navigator.onLine;
        if (!online){
            this.setState({offlineWarningText: 'OFFLINE'});
        }

        // if(!navigator.onLine){
        //     this.setState({
        //         offlineWarningText: 'You are offline. The events shown may not be up to date. Please connect to internet to make searches and to get up to date events.'
        //     });
        // } else {
        //     this.setState({
        //         offlineWarningText: ''
        //     });
        // }

        return (
            
            <ul className="EventList">
                {events.map(event => 
                    <li key={event.id}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
        );
    }
}

export default EventList;