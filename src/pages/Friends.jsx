import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import AllFriendInvitations from "../components/Friends/AllFriendInvitations";
import AllFriends from "../components/Friends/AllFriends";
import SearchBar from "../components/SearchBar";
import { CircularProgress } from "@mui/material";

const Friends = () => {
  const { token, user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [friendshipStatus, setFriendshipStatus] = useState("");

  const getFriends = () => {
    //get all friends list
    const config = {
      method: "get",
      url: "https://en2deux.netlify.app/api/friend/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data[0].friendRequests);
        setFriends(response.data[0].friends);
        setInvitations(response.data[0].friendRequests);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getFriends();
  }, [token]);

  // handleSearch() CALLS THIS FUNCTION
  // CHECKS IF A RELATION EXIST
  // IF EXIST => relationStatus = "accepted"
  // IF NOT => CheckInvite()
  const checkFriendship = (username) => {
    const config = {
      method: "get",
      url: `https://en2deux.netlify.app/api/friend/search?username=${username}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.length > 0) {
          if (response.data[0].status === "pending") {
            if (response.data[0].requestor.username === username)
              setFriendshipStatus("Pending (waiting for your answer)");
            else {
              setFriendshipStatus("Pending (waiting for their answer)");
            }
          } else {
            setFriendshipStatus(response.data[0].status);
          }
        } else {
          setFriendshipStatus("add");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //IF NO INVITE AND NO RELATION
  const handleAdd = (searchedUser) => {
    const config = {
      method: "post",
      url: `https://en2deux.netlify.app/api/friend/${searchedUser[0]._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!token) return <CircularProgress color="secondary" />;

  return (
    <div className="Friends">
      <h1>Your friends</h1>
      <SearchBar
        relationStatus={friendshipStatus}
        setRelationStatus={setFriendshipStatus}
        checkRelation={checkFriendship}
        handleAdd={handleAdd}
      />
      <AllFriendInvitations invitations={invitations} getFriends={getFriends} />
      <AllFriends friends={friends} user={user} getFriends={getFriends} />
    </div>
  );
};

export default Friends;
