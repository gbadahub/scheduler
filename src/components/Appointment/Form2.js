import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

// resets entry when invoked
  function reset() {
    setStudent("");
    setError("");
    setInterviewer(null);
  }

// function calls reset when cancel is clicked
  function cancel() {
    reset();
    props.onCancel();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSave(student, interviewer);
  };

  // function to check student name
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            value={student}
            type="text"
            onChange={(event) => {
              setStudent(event.target.value);
            }}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button
            confirm
            onSubmit={(event) => handleSubmit(event)}
            onClick={validate}
          >
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
