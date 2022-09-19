import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";
import { AuthContext } from "../contexts/AuthContext";

const NewEventDeadlines = () => {
  const initialEventState = {
    name: "",
    description: "",
    locationSuggestions: [],
    dateSuggestion: [],
    durationInHours: undefined,
    informationGatheringDeadline: undefined,
    votingStageDeadline: undefined,
  };
  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState(initialEventState);
  
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
  
  const fields = [
    { id: "name", fieldName: "Name" },
    {
      id: "description",
      fieldName: "Description",
      placeholder: "250 characters max",
    },
    { id: "locationSuggestions", fieldName: "LocationSuggestions" },
    { id: "dateSuggestion", fieldName: "Time Range" },
    { id: "durationInHours", fieldName: "Duration" },
    {
      id: "informationGatheringDeadline",
      fieldName: "informationGatheringDeadline",
    },
    { id: "votingStageDeadline", fieldName: "votingStageDeadline" },
  ];
  
  return (
    <div className="NewEvent">
      <h2>Set up deadlines</h2>
      <Form
        submitField="Create"
        fields={fields}
        formData={event}
        setFormData={setEvent}
        initialFormDataState={initialEventState}
        submitFunc={createEvent}
      />
      <Link to="/newevent/date">
        <Button variant="outlined" color="success">
          Next Step
        </Button>
      </Link>
    </div>
  );
  };

export default NewEventDeadlines;




