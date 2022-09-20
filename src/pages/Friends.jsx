import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import AllFriendInvitations from "../components/Friends/AllFriendInvitations";
import AllFriends from "../components/Friends/AllFriends";

const Friends = () => {
  
  const { token, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState([]);
  
  useEffect (() => {
    //get all friends list
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
    
    //get all invitations list
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
  }, [token, friends, invitations]);
  
  if(!token) return <p>Loading...</p>
  
  return (
    <div className="Friends">
      <h1>Your friends</h1>
        <AllFriendInvitations invitations={invitations}/>
        <AllFriends friends={friends} user={user}/>
    </div>

  ) 
};

export default Friends;
