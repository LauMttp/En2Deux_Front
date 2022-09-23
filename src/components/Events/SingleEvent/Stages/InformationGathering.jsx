import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  Slider,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../contexts/AuthContext";

const InformationGathering = ({ eventData, currentAttendeeId }) => {
  const { token } = useContext(AuthContext);
  const baseUrl = "http://localhost:5005";
  const [attendeeInformations, setAttendeeInformations] = useState({
    availabilities: [],
    budget: 50,
    location: "",
  });

  const submitAttendeeInfos = (e) => {
    e.preventDefault();
    console.log({ attendeeInformations });
    const config = {
      method: "patch",
      url: `${baseUrl}/api/attendee//informationproviding/${currentAttendeeId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: attendeeInformations,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(attendeeInformations.availabilities);

  return (
    <Box className="Gathering">
      Deadline to fill your informations :{" "}
      {eventData.event.informationGatheringDeadline}
      <form onSubmit={submitAttendeeInfos}>
        <InputLabel htmlFor={attendeeInformations.availabilities}>
          Your availabilities
        </InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={attendeeInformations.availabilities}
            minDate={eventData.event.dateSuggestion[0]}
            maxDate={eventData.event.dateSuggestion[1]}
            onChange={(newValue) => {
              setAttendeeInformations({
                ...attendeeInformations,
                availabilities: newValue,
              });
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </LocalizationProvider>
        <InputLabel htmlFor={attendeeInformations.budget}>
          What is your daily budget for the housing ?
        </InputLabel>
        <Slider
          defaultValue={200}
          min={10}
          max={1000}
          value={attendeeInformations.budget}
          onChange={(e) =>
            setAttendeeInformations({
              ...attendeeInformations,
              budget: e.target.value,
            })
          }
          aria-label="Default"
          valueLabelDisplay="auto"
        />
        <InputLabel htmlFor={attendeeInformations.location}>
          Select your prefered location
        </InputLabel>
        <Autocomplete
          disablePortal
          id={attendeeInformations.location}
          options={eventData.event.locationSuggestions}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Locations" />}
          value={attendeeInformations.location}
          onChange={(e) => {
            setAttendeeInformations({
              ...attendeeInformations,
              location: e.target.textContent,
            });
          }}
        />
        <Button variant="outlined" color="success" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default InformationGathering;
