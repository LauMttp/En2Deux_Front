import {
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useContext } from "react";
import UserAvatar from "../UserAvatar";
import "./FriendRow.css";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";

const FriendRow = ({ friend, getFriends, friendshipId }) => {
  const { token } = useContext(AuthContext);

  console.log(friend._id);

  const handleDelete = () => {
    const config = {
      method: "delete",
      url: `https://endeuxdeux.herokuapp.com/api/friend/${friendshipId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
    <div className="FriendRow">
      <ListItemButton>
        <ListItemAvatar>
          <UserAvatar
            initial={friend.name.charAt(0) + friend.surname.charAt(0)}
          />
        </ListItemAvatar>
        <ListItemText
          id={friend._id}
          primary={friend.username}
          secondary={`${friend.name} ${friend.surname}`}
        />
      </ListItemButton>
      <Button
        className="delete-button"
        size="small"
        variant="contained"
        color="error"
        onClick={() => handleDelete()}
      >
        Delete
      </Button>
    </div>
  );
};

export default FriendRow;
