import React from 'react'
import FriendRow from './FriendRow'
import './AllFriends.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


const AllFriends = ({friends, user, getFriends}) => {

  return (
    <div className='AllFriends'>
        <h2> Friends </h2>
          <ul>
            {
              friends.length === 0 ?
              ( <>
                  <li>Your don't have friends yet.
                  <br/>Add them with their usernames !</li>
                </>
              ):(
                <>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {friends.map((friend) => {
                  return (
                    <ListItem key={friend._id} disablePadding>
                      {
                        friend.requestor._id === user._id  ?
                        ( <FriendRow friendshipId={friend._id} friend={friend.requested} getFriends={getFriends}/>
                        ):(
                          <FriendRow friendshipId={friend._id} friend={friend.requestor} getFriends={getFriends}/>)

                      }
                    </ListItem>
                  )
                })}
                </List>
                </>
              )
            }
          </ul>
    </div>
  )
}

export default AllFriends;