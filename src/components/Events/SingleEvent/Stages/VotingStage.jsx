import { Box } from "@mui/material";
import React from "react";

const VotingStage = ({ eventData }) => {
  return (
    <Box className="Voting">
      <div>
        <p>
          Deadline to vote for the best options :{" "}
          {eventData.event.votingStageDeadline}
        </p>
        <p>Options to be displayed</p>
      </div>
    </Box>
  );
};

export default VotingStage;
