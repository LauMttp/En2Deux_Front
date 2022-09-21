import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Informations = ({ eventData }) => {
  return (
    <Box>
      <h1>{eventData.event.name}</h1>
      <p>Created by : {eventData.event.author}</p>
      <h4>Administrators</h4>
      {eventData.attendees.map((attendee) =>
        attendee.isAdmin ? <p>{attendee.user}</p> : null
      )}
      <p>Description : {eventData.event.description}</p>
      {eventData.event.isAdmin && <Button size="small">Edit </Button>}
      <p>Duration: {eventData.event.durationInHours / 24} days</p>
    </Box>
  );
};

export default Informations;
