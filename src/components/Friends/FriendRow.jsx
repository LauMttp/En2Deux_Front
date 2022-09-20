import { Avatar, Button, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import UserAvatar from '../UserAvatar'
import './FriendRow.css'

const FriendRow = ({friend}) => {
  return (
    <div className='FriendRow'>
        <ListItemButton>
            <ListItemAvatar>
                <UserAvatar initial={friend.name.charAt(0) + friend.surname.charAt(0)} />
            </ListItemAvatar>
            <ListItemText id={friend._id} primary={friend.username} secondary={`${friend.name} ${friend.surname}`} />
        </ListItemButton>
    </div>
  )
}

export default FriendRow