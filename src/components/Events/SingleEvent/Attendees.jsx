import { Button, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import UserAvatar from '../../UserAvatar';
import './Attendees.css'

const Attendees = ({eventData, deleteAttendee}) => {
  return (
    <Box className='attendee-box'>
    <h4>Attendees</h4>
    {eventData.attendees.map((attendee) => {
      return !attendee.isAdmin ? (
        <>
          <ListItemButton>
          <ListItemAvatar>
              <UserAvatar initial={attendee.user.name.charAt(0) + attendee.user.surname.charAt(0)} />
          </ListItemAvatar>
          <ListItemText id={attendee.user._id} primary={`${attendee.user.name} ${attendee.user.surname}`} secondary={attendee.user.username} />
          </ListItemButton>
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