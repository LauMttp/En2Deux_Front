import { Button } from "@mui/material";
import React from "react";
import InformationGathering from "./Stages/InformationGathering";
import VotingStage from "./Stages/VotingStage";

const Stage = ({
  eventData,
  handleSubmit,
  setAttendeeInformations,
  attendeeInformations,
}) => {
  return (
    <div>
      <div className="Stage">
        <h2>Stage : {eventData.event.stage}</h2>
        {eventData.event.isAdmin && (
          <Button size="small">close the current stage</Button>
        )}
      </div>
      <InformationGathering
        eventData={eventData}
        handleSubmit={handleSubmit}
        setAttendeeInformations={setAttendeeInformations}
        attendeeInformations={attendeeInformations}
      />
      <VotingStage eventData={eventData} />
    </div>
  );
};

export default Stage;
