import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const Attendees = ({eventData, deleteAttendee}) => {
  return (
    <Box>
    <h4>Attendees</h4>
    {eventData.attendees.map((attendee) => {
      return !attendee.isAdmin ? (
        <>
          <p>{attendee.user}</p>
          {eventData.event.stage === "Information gathering" &&
            eventData.event.isAdmin && (
              <Button
                size="small"
                onClick={() => deleteAttendee(attendee._id)}
              >
                Delete
              </Button>
            )}
        </>
      ) : null;
    })}
  </Box>
  )
}

export default Attendees