import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const {day,days,setDay} = props
  return (
    <ul>
      {days.map((day) => (
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.value}
          setDay={props.onChange}
        />
      ))}
    </ul>
  );
}
