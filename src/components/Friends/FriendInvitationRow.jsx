import {
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import UserAvatar from "../UserAvatar";
import "./FriendInvitationRow.css";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const FriendInvitationRow = ({ invitationId, requestor, getFriends }) => {
  const { token } = useContext(AuthContext);

  const baseUrl = "http://localhost:5005";


  const handleResponse = (string) => {
    const data = JSON.stringify({
      answer: string,
    });

    const config = {
      method: "patch",
      url: `${baseUrl}/api/friend/${invitationId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        getFriends();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="FriendInvitationRow">
      <ListItemButton>
        <ListItemAvatar>
          <UserAvatar
            initial={requestor.name.charAt(0) + requestor.surname.charAt(0)}
          />
        </ListItemAvatar>
        <ListItemText
          id={requestor._id}
          primary={requestor.username}
          secondary={`${requestor.name} ${requestor.surname}`}
        />
      </ListItemButton>
      <Button
        className="button"
        id="accepted"
        size="small"
        variant="contained"
        color="success"

        onClick={() => handleResponse("yes")}
      >
        Accept
      </Button>
      <Button
        className="button"
        id="declined"
        size="small"
        variant="outlined"
        color="error"

        onClick={() => handleResponse("no")}
      >
        Decline
      </Button>
    </div>
  );
};

export default FriendInvitationRow;
