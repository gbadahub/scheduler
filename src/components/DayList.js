import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  console.log('Testing props',props)
  return(
    
    <ul onClick={() => props.setDay(props.days.name)}>
  {props.days.map(day =>
  <DayListItem key={day.id} name={day.name} spots={day.spots} selected={day.name === day} setDay={day.setDay}/>
)

}
    </ul>
  )
}





