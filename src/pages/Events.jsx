import { Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Events = () => {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  console.log("Events:", events);

  useEffect(() => {
    const config = {
      method: "get",
      url: "http://localhost:5005/api/event/byrole/admin",
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
              return <li key={event._id}>{event.name}</li>;
            })
          )}
        </ul>
      </div>
      <h2>Invitations</h2>
      <div></div>
      <Link to="/newevent">
        <Button variant="contained" color="success">
          Create new event
        </Button>
      </Link>
    </div>
  );
};

export default Events;
