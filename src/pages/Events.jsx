import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Events = () => {
  const { token } = useContext(AuthContext);
  const [adminAttendances, setAdminAttendances] = useState([]);
  const [notAdminAttendances, setNotAdminAttendances] = useState([]);

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
        setAdminAttendances(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    const config2 = {
      method: "get",
      url: `${baseUrl}/api/event/byrole/notAdmin`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config2)
      .then(function (response) {
        setNotAdminAttendances(response.data);
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
        <h4>Administrated event</h4>
        <ul>
          {adminAttendances.length === 0 ? (
            <>
              <li>
                Your don't have events yet.
                <br />
                You can create one and invite your friends to participate!
              </li>
            </>
          ) : (
            adminAttendances.map((attendance) => {
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
      <div>
        <h4>Not administrated event</h4>
        {notAdminAttendances.map((attendance) => {
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
        })}
      </div>
    </div>
  );
};

export default Events;
