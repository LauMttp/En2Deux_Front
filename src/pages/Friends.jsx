import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import AllFriendInvitations from "../components/Friends/AllFriendInvitations";
import AllFriends from "../components/Friends/AllFriends";
import SearchBar from "../components/SearchBar";
import { List } from "@mui/material";

const Friends = () => {
  
  const { token, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const getFriends = () => {
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
  }

  useEffect (() => {
    getFriends()
  }, [token]);

  if(!token) return <p>Loading...</p>
  
  return (
    <div className="Friends">
      <h1>Your friends</h1>
        {/* <SearchBar list={allUsers} func={getAllUsers}/> */}
        
        <SearchBar friends={friends}/>
        <List>
        
        </List>
        <AllFriendInvitations invitations={invitations} getFriends={getFriends}/>
        <AllFriends friends={friends} user={user} getFriends={getFriends}/>
    </div>

  ) 
};


        // <div className='usersList'>
        //   {allUsers
        //   .filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
        //   .map(({username}) => {return <li key={username} {...{ username}} /> 
        //   })}
        // </div>

        // const getAllUsers = () => {
        //   const config = {
        //     method: 'get',
        //     url: 'http://localhost:5005/api/user/',
        //     headers: { 
        //       'Authorization': `Bearer ${token}`
        //     }
        //   };
          
        //   axios(config)
        //   .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     setAllUsers(response.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        // }

export default Friends;
