import React, { Component } from 'react';
import './App.css';
import AddAppointment from './components/Appointments/Add/Add';
import SearchAppointment from './components/Appointments/Search/Search';
import ListAppointment from './components/Appointments/List/List';
class App extends Component {
  state ={
    dogAppointments: [],
    lastIndex: 1
  };
  componentDidMount() {
    fetch('./data.json')
      .then(res => res.json())
      .then(appointmentItems => {
        let appointmentItemFinal = appointmentItems.map(item => {
          item.id = this.state.lastIndex;
          this.setState({
            lastIndex: this.state.lastIndex + 1
          });
          return item;
        });
        console.log('appointment:', appointmentItemFinal);
        this.setState({
          dogAppointments: appointmentItemFinal
        });
      })
      .catch(error => {
        console.log('Error', error);
      })
  }
  render() {
    return (
      <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointment />
              <SearchAppointment />
              <ListAppointment appointments={this.state.dogAppointments}/>
            </div>
          </div>
        </div>
      </div>
    </main>
      );
  }

}

export default App;
