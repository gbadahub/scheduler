import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


export default function Appointments(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
   
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
    .catch((err) => console.log(err));
  }

  //only perform the deletion when the user confirms
   const confirm = () => {
    transition(CONFIRM);
      // to delete appt 

  };
  const cancelledAppointment = () => {
    transition(DELETING);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => console.log(error));
  };



  return (
    <article className="appointment">
      <Header time={props.time} />
      
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
        />
      )}
      {mode === CREATE && (
      <Form 
      interviewers={props.interviewers}
       onCancel={back} 
       onSave = {save}
      />
      )}
      {mode === SAVING &&
      (<Status  text="Saving"/>)}
      {mode ===DELETING &&
      (<Status text="Deleting"/>)}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={cancelledAppointment}
        />
      )}
    </article>
  );
}


