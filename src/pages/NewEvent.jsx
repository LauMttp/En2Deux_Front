import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import StepOne from "../components/Events/NewEvent/StepOne";
import StepTwo from "../components/Events/NewEvent/StepTwo";
import StepThree from "../components/Events/NewEvent/StepThree";
import "./NewEvent.css";

const NewEvent = () => {
  const initialEventState = {
    name: "",
    description: "",
    locationSuggestions: [],
    dateSuggestion: [],
    durationInHours: "",
    informationGatheringDeadline: "",
    votingStageDeadline: "",
  };
  const baseUrl = "https://endeuxdeux.herokuapp.com";
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState(initialEventState);
  const [step, setStep] = useState(0);

  function createEvent() {
    const config = {
      method: "post",
      url: `${baseUrl}/api/event/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: event,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigate(`/events/${response.data.eventCreated._id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="NewEvent">
      <h2>NEW EVENT</h2>
      {step === 0 && (
        <StepOne
          event={event}
          setEvent={setEvent}
          setStep={setStep}
          step={step}
          initialEventState={initialEventState}
        />
      )}

      {step === 1 && (
        <StepTwo
          setEvent={setEvent}
          event={event}
          setStep={setStep}
          step={step}
        />
      )}
      {step === 2 && (
        <StepThree
          setEvent={setEvent}
          event={event}
          setStep={setStep}
          step={step}
          initialEventState={initialEventState}
          createEvent={createEvent}
        />
      )}
    </div>
  );
};

export default NewEvent;
