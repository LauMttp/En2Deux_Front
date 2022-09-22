import { Button, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../../Form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const StepOne = ({ event, setEvent, setStep, step, initialEventState }) => {
  const firstStepFields = [
    { id: "name", fieldName: "Name" },
    {
      id: "description",
      fieldName: "Description",
      placeholder: "250 characters max",
    },
    { id: "durationInHours", fieldName: "Duration (in hours)", type: "number" },
  ];
  const top100cities = [
    "Paris",
    "Marseille",
    "Lyon",
    "Nantes",
    "Bordeaux",
    "Lille",
    "Stasbourg",
    "Montpellier",
    "Rouen",
    "Reims",
    "Evry",
    "Boulogne",
    "Annecy",
    "Metz",
    "Nancy",
    "Amiens",
    "Londres",
    "Madrid",
    "Barcelone",
    "Munich",
    "Rome",
    "Naples",
    "Berlin",
    "Amsterdam",
  ];

  return (
    <div className="NewEvent">
      <Form
        submitField="Create"
        fields={firstStepFields}
        formData={event}
        setFormData={setEvent}
        initialFormDataState={initialEventState}
      />
      <InputLabel htmlFor="locationSuggestions">
        Location Suggestions
      </InputLabel>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={top100cities}
        getOptionLabel={(option) => option}
        defaultValue={[top100cities[0]]}
        filterSelectedOptions
        value={event.locationSuggestions}
        onChange={(_, value) => {
          setEvent({ ...event, locationSuggestions: value });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selected Potential Locations"
            placeholder="Locations"
          />
        )}
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
};

export default StepOne;
