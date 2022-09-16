import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NewEventDate = () => {
  return (
    <div>
      <h2>Set up date</h2>
      <Link to="/newevent/location">
        <Button variant="outlined" color="success">
          Next Step
        </Button>
      </Link>
    </div>
  );
};

export default NewEventDate;
