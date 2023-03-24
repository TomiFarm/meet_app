import React, { Component } from 'react';
import './App.css';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { WarningAlert } from './Alert';

import './nprogress.css';

import WelcomeScreen from './WelcomeScreen';


class App extends Component {

  state = {
    events: [],
    locations: [],
    eventCount: 32,
    selectedLocation: 'all',
    showWelcomeScreen: undefined
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted){
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
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
    if (this.state.showWelcomeScreen === undefined) {
      return (
        <div classname="App" />
      )
    }

    const online = navigator.onLine;
    let warningText = 'Testi';
    if (!online){
      warningText = 'You are offline. The events you are seeing may not be up to date. Please connect to internet to get up to date events.';
    } else {
      warningText = '';
    };

    return (
      <div className="App">
        <WarningAlert text={warningText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={ () => {getAccessToken()} } />
      </div>
    );
  };
}



export default App;
