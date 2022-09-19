import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";

const Friends = () => {
  
  const { token, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState("");
  
  console.log("Friends:",friends)
  console.log("Invitations", invitations)
  
  useEffect (() => {
    const config = {
      method: 'get',
      url: 'http://localhost:5005/api/friend/',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config)
    .then(function (response) {
      setFriends(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    const config2 = {
      method: 'get',
      url: 'http://localhost:5005/api/friend/invitations',
      headers: { 
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios(config2)
    .then(function (response) {
      setInvitations(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [token]);
  
  if(!token) return <p>Loading...</p>
  
  return (
    <div className="Friends">
      <h1>Your friends</h1>
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
                      {request.requestor.username}
                    </li> 
                  )
                })
              )
            }
          </ul>

        <h2> Friends </h2>
          <ul>
            {
              friends.length === 0 ?
              ( <>
                  <li>Your don't have friends yet.
                  <br/>Add them with their usernames !</li>
                </>
              ):(
                friends.map(friend => {
                  return ( <li key={friend._id}> {friend.requestor._id === user._id  ?
                      (friend.requested.username):(friend.requestor.username)} </li> )
                })
              )
            }
          </ul>
    </div>

  ) 
};

export default Friends;
