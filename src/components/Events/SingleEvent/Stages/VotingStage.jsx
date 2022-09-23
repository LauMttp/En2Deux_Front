import { Box } from "@mui/material";
import React from "react";
import Option from "../../../Option";

const VotingStage = ({ eventData }) => {
  return (
    <Box className="Voting">
      <div>
        <p>
          Deadline to vote for the best options :{" "}
          {eventData.event.votingStageDeadline}
        </p>
        <p>Tiiiimeeee to Vote !!!</p>
        <Option number={1}/>
        <Option number={2}/>
        <Option number={3}/>
        <Option number={4}/>
        <Option number={5}/>
        <Option number={6}/>
      </div>
    </Box>
  );
};

export default VotingStage;
