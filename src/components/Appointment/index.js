import React from "react";
import Appointment from "components/Appointment";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointments(props) {
  const showOrEmpty = props.interview ? (
    <Show
      student={props.interview.students}
      interviewer={props.interview.interviewer}
      onEdit={props.onEdit}
      ondelete={props.ondelete}
    />
  ) : (
    <Empty />
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {showOrEmpty}
    </article>
  );
}
