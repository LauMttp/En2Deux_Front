import React from 'react'
import FriendInvitationRow from './FriendInvitationRow'

const AllFriendInvitations = ({invitations}) => {
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
              invitations.map(request => {
                return ( 
                  <li key={request._id}>
                    <FriendInvitationRow invitationId={request._id} requestor={request.requestor}/>
                  </li> 
                )
              })
            )
          }
        </ul>
    </div>
  )
}

export default AllFriendInvitations