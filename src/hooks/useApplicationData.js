import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // update spot function 
  const spotUpdate = (weekday, day, variable) => {
    let spot = day.spots;
    
    
    if (weekday === day.name && variable === "REMOVE_SPOT") {
      if (spot === 0){
        return spot
      } 
      return spot - 1;
    } else if (weekday === day.name && variable === "ADD_SPOT") {
      if (spot === 5 ){
        return spot
      } 
      return spot + 1;
    } else {
      return spot;
    }
  };
  const updateSpots = (weekday, days, variable) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable),
        };
      });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray = days.map((day) => {
        return {
          ...day,
          spots: spotUpdate(weekday, day, variable),
        };
      });
      return updatedStateDayArray;
    } else{
      return days
    }
  
  };

  const setDay = (day) => setState({ ...state, day });

  // using axios api for http requests to 
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

// http request to update database when appt is booked
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const spotUpdate = updateSpots(state.day, state.days,state.appointments[id].interview ? "" : "REMOVE_SPOT");
      setState({
        ...state,
        days: spotUpdate,
        appointments,
      });
    });
    
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

    // http request to update database when appt is canceled 
    return axios
      .delete(`/api/appointments/${appointment}`, deleteAppointment)
      .then(() => {
        const spotUpdate = updateSpots(state.day, state.days, "ADD_SPOT");
        setState({
          ...state,
          days: spotUpdate,
          deleteAppointment,
        });
      });
  }

  

  return { state, setDay, bookInterview, cancelInterview, };
}
