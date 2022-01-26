import { useState, useEffect } from "react";
import axios from "axios"; 


export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });


  const setDay = (day) => setState({ ...state, day });


 // using axios api got http requests
 useEffect(() => {
  Promise.all([
    axios.get("http://localhost:8001/api/days"),
    axios.get("http://localhost:8001/api/appointments"),
    axios.get("http://localhost:8001/api/interviewers"),
  ]).then((all) => {
    setState((prev) => ({
      ...prev,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data,
    }));
  });
}, []);

// booking interviews
function bookInterview(id, interview) {
  const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment,
  };
  return axios
  .put(`/api/appointments/${id}`, { interview })
  .then(() => setState((prev) => ({ ...prev, appointments })));
}

 // cancelling appt
 function cancelInterview(appointment) {
  const deleteAppointment = {
    ...state.appointments[appointment],
    interview: null,
  };
  const deleteAppointments = {
    ...state.appointments,
    [appointment]: deleteAppointment,
  };
  return axios.delete(`/api/appointments/${appointment}`,
  deleteAppointment)
  .then(() => setState(() => ({...state, deleteAppointments })));
}

//function to edit interview
function editInterview(appointmentId, interviewObj){
  const editedAppointment = {
    ...state.appointments[appointmentId],
    interview: interviewObj,
  };

  const editedAppointments = {
    ...state.appointments,
    [appointmentId]: editedAppointment,
  };
  return axios
  .put(`/api/appointments/${appointmentId}`, editedAppointments[appointmentId])
  .then(setState({ ...state, appointments: editedAppointments }));
}

return { state, setDay, bookInterview, cancelInterview ,editInterview};


}