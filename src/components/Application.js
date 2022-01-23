import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import axios from "axios"
import "components/Application.scss";
import Appointments from "components/Appointment";
import {getAppointmentsForDay, getInterview} from "helpers/selectors";




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  
const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log('blahhhh', interview)
    return <Appointments
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}/>;
  });

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
   axios.get("http://localhost:8001/api/days"),
   axios.get("http://localhost:8001/api/appointments"),
   axios.get("http://localhost:8001/api/interviewers")
  ]).then((all)=> {
   
    const [days, appointments, interviewers] = all;
    setState(prev => ({
      ...prev,
      days: days.data,
      appointments: appointments.data,
      interviewers: interviewers.data
    }));
  });
}, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList  days={state.days} day={state.day} onChange={setDay}  />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointments key="last" time="5pm" />
      </section>
    </main>
  );
}
