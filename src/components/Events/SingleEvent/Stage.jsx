import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import InformationGathering from "./Stages/InformationGathering";
import VotingStage from "./Stages/VotingStage";

const Stage = ({
  eventData,
  eventId,
  setEventData,
  setAttendeeInformations,
  attendeeInformations,
}) => {
  const { token } = useContext(AuthContext);
  const baseUrl = "http://localhost:5005";
  const [newStage, setNewStage] = useState({
    stage: eventData.event.stage,
  });

  const closeCurrentStage = () => {
    console.log(eventData.event.stage);
    let stageToUpdate;
    if (eventData.event.stage === "Information gathering") {
      setNewStage({ stage: "Voting stage" });
      stageToUpdate = { stage: "Voting stage" };
    } else if (eventData.event.stage === "Voting stage") {
      setNewStage({ stage: "Upcoming" });
      stageToUpdate = { stage: "Upcoming" };
    } else if (eventData.event.stage === "Upcoming") {
      setNewStage({ stage: "On-going" });
      stageToUpdate = { stage: "On-going" };
    } else if (eventData.event.stage === "On-going") {
      setNewStage({ stage: "Finished" });
      stageToUpdate = { stage: "Finished" };
    }

    const config = {
      method: "patch",
      url: `${baseUrl}/api/event/${eventId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: stageToUpdate,
    };

    axios(config)
      .then(function (response) {
        console.log("Event updated ", response.data);
        setEventData((prevState) => {
          return {...prevState, event: {...prevState.event, stage: response.data.stage}}
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="StageHeader">
        <h2>Stage : {eventData.event.stage}</h2>
        {eventData.event.isAdmin && (
          <Button size="small" onClick={closeCurrentStage}>
            close the current stage
          </Button>
        )}
      </div>

      {eventData.event.stage === "Information gathering" && (
        <InformationGathering
          eventData={eventData}
          setAttendeeInformations={setAttendeeInformations}
          attendeeInformations={attendeeInformations}
        />
      )}

      {eventData.event.stage === "Voting stage" && (
        <VotingStage eventData={eventData} />
      )}
    </div>
  );
};

export default Stage;
