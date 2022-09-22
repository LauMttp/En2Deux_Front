import { ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Form from "../../Form";

import UserAvatar from "../../UserAvatar";
import "./Informations.css";

const EditableInformations = ({
  eventData,
  setEventData,
  eventId,
  setisEditable,
}) => {
  const { token } = useContext(AuthContext);
  const [newInfos, setNewInfos] = useState({
    description: eventData.event.description,
    durationInHours: eventData.event.durationInHours,
  });
  const baseUrl = "https://en2deux.netlify.app";

  const updateEvent = () => {
    const config = {
      method: "patch",
      url: `${baseUrl}/api/event/${eventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: newInfos,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setEventData({
          ...eventData,
          event: { ...response.data, isAdmin: true },
        });

        setisEditable((current) => !current);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fields = [
    { id: "description", fieldName: "Description" },
    { id: "durationInHours", fieldName: "Duration in hours", type: "number" },
  ];

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

      <Form
        submitField="Save"
        fields={fields}
        formData={newInfos}
        setFormData={setNewInfos}
        initialFormDataState={newInfos}
        submitFunc={updateEvent}
        isSubmit={true}
      />
    </Box>
  );
};

export default EditableInformations;
