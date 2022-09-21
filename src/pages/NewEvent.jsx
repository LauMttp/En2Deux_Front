import { Box, Button, InputLabel, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";
import { AuthContext } from "../contexts/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";


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
  const baseUrl = "http://localhost:5005";
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

  const firstStepFields = [
    { id: "name", fieldName: "Name" },
    {
      id: "description",
      fieldName: "Description",
      placeholder: "250 characters max",
    },
    { id: "durationInHours", fieldName: "Duration" },
    { id: "locationSuggestions", fieldName: "LocationSuggestions" },
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
        <InputLabel htmlFor={event.dateSuggestion}>Time Range</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={event.dateSuggestion}
            onChange={(newValue) => {
              setEvent({ ...event, dateSuggestion: newValue });
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
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
