import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Events = () => {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);

  const baseUrl = "http://localhost:5005";

  useEffect(() => {
    const config = {
      method: "get",
      url: `${baseUrl}/api/event/byrole/admin`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setEvents(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    const config2 = {
      method: "get",
      url: `${baseUrl}/api/event/invitations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config2)
      .then(function (response) {
        setInvitations(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  if (!token) return <p>Loading...</p>;

  return (
    <div>
      <h2>Events</h2>
      <div>
        <ul>
          {events.length === 0 ? (
            <>
              <li>
                Your don't have events yet.
                <br />
                You can create one and invite your friends to participate!
              </li>
            </>
          ) : (
            events.map((event) => {
              return <li key={event._id}>{event.event.name}</li>;
            })
          )}
        </ul>
      </div>
      <h2>Invitations</h2>
      <div>
        <ul>
          {invitations.length === 0 ? (
            <>
              <li>Your don't have invitations yet.</li>
            </>
          ) : (
            invitations.map((invitation) => {
              return <li key={invitation._id}>{invitation.event.name}</li>;
            })
          )}
        </ul>
      </div>
      <Link to="/newevent">
        <Button variant="contained" color="success">
          Create new event
        </Button>
      </Link>
    </div>
  );
};

export default Events;
