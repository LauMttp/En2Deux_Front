import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";
import { AuthContext } from "../contexts/AuthContext";


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

  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState(initialEventState);
  const [step, setStep] = useState(0);

  const baseUrl = "http://localhost:5005";

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
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const firstStepFields = [
    { id: "name", fieldName: "Name" },
    {
      id: "description",
      fieldName: "Description",
      placeholder: "250 characters max",
    },
    { id: "locationSuggestions", fieldName: "LocationSuggestions" },
  ];

  const secondStepFields = [
    { id: "dateSuggestion", fieldName: "Time Range", type: "date" },
    { id: "durationInHours", fieldName: "Duration" },
  ];
  const thirdStepFields = [
    {
      id: "informationGatheringDeadline",
      fieldName: "informationGatheringDeadline",
      type: "date",
    },
    {
      id: "votingStageDeadline",
      fieldName: "votingStageDeadline",
      type: "date",
    },
  ];
  if (step === 0)
    return (
      <div className="NewEvent">
        <h2>NEW EVENT</h2>
        <Form
          submitField="Create"
          fields={firstStepFields}
          formData={event}
          setFormData={setEvent}
          initialFormDataState={initialEventState}
        />
        <div>
          <Link to="/events">
            <Button
              variant="outlined"
              color="success"
              onClick={(e) => setStep(step - 1)}
            >
              Back
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="success"
            onClick={(e) => setStep(step + 1)}
          >
            Next Step
          </Button>
        </div>
      </div>
    );
  else if (step === 1)
    return (
      <div className="NewEvent">
        <h2>NEW EVENT</h2>
        <Form
          submitField="Create"
          fields={secondStepFields}
          formData={event}
          setFormData={setEvent}
          initialFormDataState={initialEventState}
        />
        <div>
          <Button
            variant="outlined"
            color="success"
            onClick={(e) => setStep(step - 1)}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={(e) => setStep(step + 1)}
          >
            Next Step
          </Button>
        </div>
      </div>
    );
  else if (step === 2)
    return (
      <div className="NewEvent">
        <h2>NEW EVENT</h2>
        <Form
          submitField="Create"
          fields={thirdStepFields}
          formData={event}
          setFormData={setEvent}
          initialFormDataState={initialEventState}
          submitFunc={createEvent}
          isSubmit={true}
        />
        <div>
          <Button
            variant="outlined"
            color="success"
            onClick={(e) => setStep(step - 1)}
          >
            Back
          </Button>
        </div>
      </div>
    );
};

export default NewEvent;
