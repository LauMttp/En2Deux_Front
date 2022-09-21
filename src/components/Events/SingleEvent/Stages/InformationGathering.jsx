import { Autocomplete, Box, Button, InputLabel, Slider, TextField } from '@mui/material'
import React from 'react'

const InformationGathering = ({eventData}) => {
  return (
    <Box className="Gathering">
    {eventData.event.stage === "Information gathering" && (
      <div>
        Deadline to fill your informations :{" "}
        {eventData.event.informationGatheringDeadline}
        <InputLabel htmlFor={eventData.dateSuggestion}>
          Your availabilities
        </InputLabel>
        <InputLabel htmlFor={eventData.dateSuggestion}>
          What is your daily budget for the housing ?
        </InputLabel>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
        <InputLabel htmlFor="location">
          Select your prefered location
        </InputLabel>
        <Autocomplete
          disablePortal
          id="location"
          options={eventData.event.locationSuggestions}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Locations" />
          )}
        />
        <Button size="small">submit</Button>
      </div>
    )}
  </Box>
  )
}

export default InformationGathering