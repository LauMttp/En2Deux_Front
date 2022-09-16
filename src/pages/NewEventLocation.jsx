import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NewEventLocation = () => {
  return (
    <div>
      <h2>Set up location</h2>
      <Link to="/newevent/deadlines">
        <Button variant="outlined" color="success">
          Next Step
        </Button>
      </Link>
    </div>
  );
};

export default NewEventLocation;
