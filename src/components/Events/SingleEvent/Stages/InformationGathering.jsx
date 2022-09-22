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
import React from "react";

const InformationGathering = ({
  eventData,
  setAttendeeInformations,
  attendeeInformations,
}) => {
  const submitAttendeeInfos = () => {
    console.log("FUNCTION TO BE CREATED ---> AXIOS PATCH ATTTENDEEE");
  };
  return (
    <Box className="Gathering">
      Deadline to fill your informations :{" "}
      {eventData.event.informationGatheringDeadline}
      <form onSubmit={submitAttendeeInfos}>
        <InputLabel htmlFor={eventData.dateSuggestion}>
          Your availabilities
        </InputLabel>

        <InputLabel htmlFor={attendeeInformations.availabilities}>
          Time Range
        </InputLabel>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                value={attendeeInformations.availabilities}
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
            </LocalizationProvider> */}

        <InputLabel htmlFor={attendeeInformations.budget}>
          What is your daily budget for the housing ?
        </InputLabel>
        <Slider
          defaultValue={50}
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
        />
        <Button variant="outlined" color="success" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default InformationGathering;
