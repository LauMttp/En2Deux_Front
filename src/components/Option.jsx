import { Rating, Typography } from "@mui/material";
import React from "react";

const Option = ({ number }) => {
  return (
    <div className="option">
      <h4>Option {number}</h4>
      <p>
        Date : From startingdate{number} to endingdate{number}
      </p>
      <p>Location : city{number}</p>
      <p>budget : budget{number} / day</p>
      <Typography component="legend">Rate the Option</Typography>
      <Rating name="read-only" value={number} readOnly />
    </div>
  );
};

export default Option;
