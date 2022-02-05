import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header2";
import Show from "./Show2";
import Empty from "./Empty2";
import Form from "./Form2";
import Status from "./Status2";
import Confirm from "./Confirm2";
import Error from "./Error2";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
 
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  }

  //only perform the deletion when the user confirms
  const confirm = () => {
    transition(CONFIRM);
    // to delete appt
  };
  const cancelledAppointment = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  // editing appt
  const edit = () => transition(EDIT);

  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status text="Saving" />}
      {mode === DELETING && <Status text="Deleting" />}
      {mode === CONFIRM && (
        <Confirm onCancel={back} onConfirm={cancelledAppointment} />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error text="Appointment could not be saved." onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error text="Appointment could not be deleted." onClose={back} />
      )}
    </article>
  );
}
