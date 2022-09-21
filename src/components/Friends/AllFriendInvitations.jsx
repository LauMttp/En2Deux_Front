import { CircularProgress } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import FriendInvitationRow from './FriendInvitationRow'

const AllFriendInvitations = ({invitations, getFriends}) => {
  const {user} = useContext(AuthContext)
  if(!user) return <CircularProgress color="secondary" />;

  return (
    <div className='AllFriendInvitations'>
      <h2> Invitations </h2>
        <ul>
          {
            invitations.length === 0 ?
            ( <>
                <li>No friend request.</li>
              </>
            ):(
              invitations.map(request => request.requestor.username !== user.username ? (
                  <li key={request._id}>
                    <FriendInvitationRow invitationId={request._id} requestor={request.requestor} getFriends={getFriends}/>
                  </li> 
                ) : null
              )
            )
          }
        </ul>
    </div>
  )
}

export default AllFriendInvitations