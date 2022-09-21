import { CircularProgress } from "@mui/material";
import "./SingleEvent.css";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Informations from "../components/Events/SingleEvent/Informations";
import Attendees from "../components/Events/SingleEvent/Attendees";
import Stage from "../components/Events/SingleEvent/Stage";

const SingleEvent = () => {
  const { token, user } = useContext(AuthContext);
  const { eventId } = useParams();
  const [eventData, setEventData] = useState("");
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
      <Informations eventData={eventData} />
      <Attendees eventData={eventData} deleteAttendee={deleteAttendee} />
      <Stage eventData={eventData} />
    </div>
  );
};

export default SingleEvent;
