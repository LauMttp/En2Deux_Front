import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Invitations.css";

const Invitations = () => {
  const { token } = useContext(AuthContext);
  const [invitations, setInvitations] = useState([]);

  const baseUrl = "https://endeuxdeux.herokuapp.com";

  useEffect(() => {
    const config = {
      method: "get",
      url: `${baseUrl}/api/event/invitations`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setInvitations(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  const handleResponse = (invitationId, string) => {
    const data = JSON.stringify({
      answer: string,
    });
    const config = {
      method: "patch",
      url: `${baseUrl}/api/attendee/${invitationId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!token) return <CircularProgress color="secondary" />;

  return (
    <div className="Main">
    <div className="invitationsheader">
    <h2>INVITATIONS</h2>
    </div>
 
      <ul>
        {invitations.length === 0 ? (
          <>
            <li>Your don't have invitations yet ..</li>
          </>
        ) : (
          invitations.map((invitation) => {
            return (
              <div className="Invitation" key={invitation.event._id}>
                <h4>{invitation.event.name}</h4>
                <Link to={`/events/${invitation.event._id}`}>
                  <Button variant="outlined" color="success" size="small">
                    View event{" "}
                  </Button>
                </Link>
                <Button
                  className="button"
                  id="accepted"
                  color="success"
                  variant="contained"
                  onClick={() => handleResponse(invitation._id, "yes")}
                >
                  Accept
                </Button>
                <Button
                  className="button"
                  id="declined"
                  color="error"
                  variant="outlined"
                  onClick={() => handleResponse(invitation._id, "no")}
                >
                  Decline
                </Button>
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Invitations;
