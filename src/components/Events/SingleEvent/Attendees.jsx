import {
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import SearchBar from "../../SearchBar";
import UserAvatar from "../../UserAvatar";
import "./Attendees.css";

const Attendees = ({ eventData, deleteAttendee }) => {
  const { token } = useContext(AuthContext);
  const [attendeeStatus, setAttendeeStatus] = useState("");

  const checkAttending = (username) => {
    if (eventData.attendees.length > 0) {
      for (let attendee of eventData.attendees) {
        if (attendee.user.username === username) {
          setAttendeeStatus(attendee.status);
        }
      }
      if (attendeeStatus === "") {
        setAttendeeStatus("add");
      }
    }
  };

  const handleAdd = (searchedUser) => {
    //To check
    const qs = require("qs");
    const data = qs.stringify({
      isAdmin: "false",
    });

    const config = {
      method: "post",
      url: `http://localhost:5005/api/attendee/${eventData.event._id}/${searchedUser._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box className="attendee-box">
      <h4>Attendees</h4>

      {eventData.event.isAdmin && (
        <SearchBar
          relationStatus={attendeeStatus}
          setRelationStatus={setAttendeeStatus}
          checkRelation={checkAttending}
          handleAdd={handleAdd}
        />
      )}

      {eventData.attendees.map((attendee) => {
        return !attendee.isAdmin ? (
          <>
            <ListItemButton>
              <ListItemAvatar>
                <UserAvatar
                  initial={
                    attendee.user.name.charAt(0) +
                    attendee.user.surname.charAt(0)
                  }
                />
              </ListItemAvatar>
              <ListItemText
                id={attendee.user._id}
                primary={`${attendee.user.name} ${attendee.user.surname}`}
                secondary={attendee.status}
              />
            </ListItemButton>
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
  );
};

export default Attendees;
