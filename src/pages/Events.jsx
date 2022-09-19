import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Events = () => {
  return (
    <div>
      <h2>Events</h2>
      <div></div>
      <h2>Invitations</h2>
      <div></div>
      <Link to="/newevent">
        <Button variant="contained" color="success">
          Create new event
        </Button>
      </Link>
    </div>
  );
};

export default Events;
