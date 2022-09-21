import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Box from "@mui/material/Box";

const SingleEvent = () => {
  const { token, user } = useContext(AuthContext);
  const { eventId } = useParams();
  const [eventData, setEventData] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
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
        // setIsLoading(true);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token, user]);

  if (!eventData) return <CircularProgress color="secondary" />;
  // if (!isLoading) return <CircularProgress color="secondary" />;

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
        {eventData.event.isAdmin && <button>Edit </button>}
        <p>Duration: {eventData.event.durationInHours / 24} days</p>
        <p>Stage : {eventData.event.stage}</p>
      </Box>

      <Box>
        <h4>Attendees</h4>
        {eventData.attendees.map((attendee) => {
          return !attendee.isAdmin ? (
            <>
              <p>{attendee.user}</p>
              {eventData.event.stage === "Information gathering" && (
                <button>Delete</button>
              )}
            </>
          ) : null;
        })}
        <p>{JSON.stringify(eventData.event)}</p>
        <p>{JSON.stringify(eventData.attendees)}</p>
      </Box>
      <Button size="small">{eventId}</Button>
    </div>
  );
};

export default SingleEvent;
