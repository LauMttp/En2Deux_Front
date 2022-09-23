import { Box, Button, CircularProgress } from "@mui/material";
import "./SingleEvent.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Informations from "../components/Events/SingleEvent/Informations";
import Attendees from "../components/Events/SingleEvent/Attendees";
import Stage from "../components/Events/SingleEvent/Stage";
import EditableInformations from "../components/Events/SingleEvent/EditableInformations";

const SingleEvent = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const { eventId } = useParams();
  const [isEditable, setisEditable] = useState(false);
  const [eventData, setEventData] = useState("");
  const [currentAttendeeId, setCurrentAttendeeId] = useState("");

  const baseUrl = "https://endeuxdeux.herokuapp.com";

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
          if (attendee.user._id === user._id) {
            setCurrentAttendeeId(attendee._id);
            if (attendee.isAdmin) {
              response.data.event.isAdmin = true;
            }
          }
        }
        setEventData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token, user]);

  // -----------------------------> MOVE TO SINGLE EVENT/ATTENDEE.JSX DOC
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
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // -----------------------------> MOVE TO SINGLE EVENT/ATTENDEE.JSX DOC

  const deleteEvent = () => {
    var config = {
      method: "delete",
      url: `${baseUrl}/api/event/${eventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log("event deleted :" + response.data);
        navigate("/events");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!eventData) return <CircularProgress color="secondary" />;

  return (
    <div className="single-event">
      {isEditable ? (
        <EditableInformations
          setEventData={setEventData}
          eventData={eventData}
          eventId={eventId}
          setisEditable={setisEditable}
        />
      ) : (
        <Informations eventData={eventData} />
      )}
      {eventData.event.isAdmin && (
        <Box>
          <Button
            color="success"
            size="small"
            onClick={(e) => {
              setisEditable((current) => !current);
            }}
          >
            {isEditable ? "Cancel" : "Edit"}
          </Button>
        </Box>
      )}

      <Stage
        isEditable={isEditable}
        eventId={eventId}
        setEventData={setEventData}
        setisEditable={setisEditable}
        eventData={eventData}
        currentAttendeeId={currentAttendeeId}
      />

      <Attendees eventData={eventData} deleteAttendee={deleteAttendee} />

      {eventData.event.author._id === user._id && (
        <Button variant="contained" color="error" onClick={deleteEvent}>
          Delete this event
        </Button>
      )}
    </div>
  );
};

export default SingleEvent;
