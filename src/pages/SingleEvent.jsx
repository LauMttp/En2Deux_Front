import {
  Autocomplete,
  Button,
  CircularProgress,
  InputLabel,
  Slider,
  TextField,
} from "@mui/material";
import "./SingleEvent.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Box from "@mui/material/Box";

const SingleEvent = () => {
  const { token, user } = useContext(AuthContext);
  const { eventId } = useParams();
  const [eventData, setEventData] = useState("");
  const [attendeeInfos, setAttendeeInfos] = useState("");
  const baseUrl = "http://localhost:5005";

  useEffect(() => {
    console.log(token, user);
    if (!token || !user) {
      return;
    }
    const config = {
      method: "get",
      url: `${baseUrl}/api/event/${eventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        for (const attendee of response.data.attendees) {
          if (attendee.isAdmin && attendee.user === user._id) {
            response.data.event.isAdmin = true;
          }
        }
        setEventData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token, user]);

  const deleteAttendee = (attendeeId) => {
    const config = {
      method: "delete",
      url: `${baseUrl}/api/attendee/${attendeeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!eventData) return <CircularProgress color="secondary" />;

  return (
    <div>
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

      <Box>
        <h4>Attendees</h4>
        {eventData.attendees.map((attendee) => {
          return !attendee.isAdmin ? (
            <>
              <p>{attendee.user}</p>
              {eventData.event.stage === "Information gathering" &&
                eventData.event.isAdmin && (
                  <Button
                    size="small"
                    onClick={() => deleteAttendee(attendee._id)}
                  >
                    Delete
                  </Button>
                )}
            </>
          ) : null;
        })}
      </Box>
      <div className="Stage">
        <h2>Stage : {eventData.event.stage}</h2>
        {eventData.event.isAdmin && (
          <Button size="small">close the current stage</Button>
        )}
      </div>
      <Box className="Gathering">
        {eventData.event.stage === "Information gathering" && (
          <div>
            Deadline to fill your informations :{" "}
            {eventData.event.informationGatheringDeadline}
            <InputLabel htmlFor={eventData.dateSuggestion}>
              Your availabilities
            </InputLabel>
            <InputLabel htmlFor={eventData.dateSuggestion}>
              What is your daily budget for the housing ?
            </InputLabel>
            <Slider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
            <InputLabel htmlFor="location">
              Select your prefered location
            </InputLabel>
            <Autocomplete
              disablePortal
              id="location"
              options={eventData.event.locationSuggestions}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Locations" />
              )}
            />
            <Button size="small">submit</Button>
          </div>
        )}
      </Box>
      <Box className="Voting">
        {eventData.event.stage === "Voting stage" && (
          <div>
            <p>
              Deadline to vote for the best options :{" "}
              {eventData.event.votingStageDeadline}
            </p>
            <p>Options to be displayed</p>
          </div>
        )}
      </Box>
    </div>
  );
};

export default SingleEvent;
