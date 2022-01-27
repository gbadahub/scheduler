import React from "react";
import DayListItem from "./DayListItem";

// contains object of days imported from daylistitem
export default function DayList(props) {
  const { days } = props;
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
