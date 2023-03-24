import React, { Component } from 'react';
import './App.css';
import { extractLocations, getEvents } from './api';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import './nprogress.css';
import { WarningAlert } from './Alert';


class App extends Component {

  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedLocation: 'all',
    offlineWarningText: ''
  };

  componentDidMount() {
    this.mounted = true;
    if(!navigator.onLine){
      this.setState({
        offlineWarningText: 'APP OFFLINE'
    });
    } else {
      this.setState({
        offlineWarningText: ''
      });
    }
    
    getEvents().then((events) => {
      if (this.mounted) {
        events = events.slice(0, this.state.eventCount);
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  };

  componentWillUnmount(){
    this.mounted = false;
  };

  updateEvents = (location, selectedEventCount) => {
    if (location){
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ? 
          events :
          events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, this.state.eventCount);
        
        this.setState({
          events: eventsToShow,
          selectedLocation: location
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (this.state.selectedLocation === 'all') ? 
          events :
          events.filter((event) => event.location === this.state.selectedLocation);
        const eventsToShow = locationEvents.slice(0, selectedEventCount);
        this.setState({
          events: eventsToShow,
          eventCount: selectedEventCount
        });
      });
    }
  };

  render() {

    return (
      <div className="App">
        <WarningAlert text={this.state.offlineWarningText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
      </div>
    );
  };

  
  

}



export default App;
