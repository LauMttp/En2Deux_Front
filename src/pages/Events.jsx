import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Events = () => {
  const { token } = useContext(AuthContext);
  const [attendances, setAttendances] = useState([]);

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
        setAttendances(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  if (!token) return <CircularProgress color="secondary" />;

  return (
    <div>
      <h2>Events</h2>
      <Link to="/newevent">
        <Button variant="contained" color="success">
          Create new event
        </Button>
      </Link>
      <div>
        <ul>
          {attendances.length === 0 ? (
            <>
              <li>
                Your don't have events yet.
                <br />
                You can create one and invite your friends to participate!
              </li>
            </>
          ) : (
            attendances.map((attendance) => {
              console.log(attendance);
              return (
                <div key={attendance.event._id}>
                  <h4>{attendance.event.name}</h4>
                  <Link to={`/events/${attendance.event._id}`}>
                    <Button variant="outlined" color="success" size="small">
                      View event{" "}
                    </Button>
                  </Link>
                </div>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Events;
