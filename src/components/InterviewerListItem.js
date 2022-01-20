import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {

  const interviewersClass = classNames("interviewers_item", {
    "interviewers__item--selected": props.selected,
 });


  return (
    <li 
    className={interviewersClass}
    onClick={() => props.setInterviewer(props.id)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
