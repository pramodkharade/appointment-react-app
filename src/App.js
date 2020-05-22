import React, { Component } from 'react';
import { without } from 'lodash';
import './App.css';
import AddAppointment from './components/Appointments/Add/Add';
import SearchAppointment from './components/Appointments/Search/Search';
import ListAppointment from './components/Appointments/List/List';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogAppointments: [],
      lastIndex: 1
    };
  }
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
  ;

  deleteAppointmentHandler =(item) => {
    console.log('delete Item before:', item);
    let appointments = this.state.dogAppointments;

    appointments = without(appointments, item);
    console.log('delete Item:', appointments.length);
    this.setState({
      dogAppointments: appointments
    });
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
              <ListAppointment
      deleteAppointment={ (item) => {
        this.deleteAppointmentHandler(item)
      }}
      appointments={this.state.dogAppointments}/>
            </div>
          </div>
        </div>
      </div>
    </main>
      );
  }

}

export default App;
