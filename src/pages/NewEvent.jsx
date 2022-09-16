import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const NewEvent = () => {
  return (
    <div>
      <h2>NEW EVENT</h2>
      <Link to="/newevent/date">
        <Button variant="outlined" color="success">
          Next Step
        </Button>
      </Link>
    </div>
  );
};

export default NewEvent;
