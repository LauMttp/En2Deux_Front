import { ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserAvatar from "../../UserAvatar";
import "./Informations.css";

const Informations = ({ eventData }) => {
  return (
    <Box className="admin-box">
      <h1>{eventData.event.name}</h1>
      <p>
        Created by : {eventData.event.author.name}{" "}
        {eventData.event.author.surname}{" "}
      </p>
      <h4>Administrators</h4>
      {eventData.attendees.map((attendee) =>
        attendee.isAdmin ? (
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
                secondary={attendee.user.username}
              />
            </ListItemButton>
          </>
        ) : null
      )}
      <p>Description :{eventData.event.description}</p>
      <p>Duration:{eventData.event.durationInHours / 24} days</p>
    </Box>
  );
};

export default Informations;
