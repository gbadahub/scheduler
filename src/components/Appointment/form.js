import React from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  function cancel () {
    reset();
    props.onCancel()
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSave(student, interviewer)
  }
   
  function onSave (){
 
    props.onSave(student,interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event)=>handleSubmit(event)}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            value ={student}
            type="text"
            onChange={(event) => setStudent(event.target.value)}  
            placeholder="Enter Student Name"
            /*
          This must be a controlled component
          your code goes here
        */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} 
        onChange={setInterviewer} 
        value={interviewer}/>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={onSave}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
