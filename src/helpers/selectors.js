
export default function getAppointmentsForDay(state, day) {
  console.log( "This is the state", state)
  const { days, appointments } = state;
  const filteredDay = days.find(item => day === item.name);
  if (days.length < 1 || filteredDay === undefined) {
    return [];
  }
  const daysAppointment = filteredDay.appointments.map(id => appointments[id]);
  return daysAppointment;
}


