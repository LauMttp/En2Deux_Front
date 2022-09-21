import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Invitations = () => {
  const { token } = useContext(AuthContext);
  const [invitations, setInvitations] = useState([]);

  const baseUrl = "http://localhost:5005";

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
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  if (!token) return <CircularProgress color="secondary" />;

  return (
    <div>
      <h2>Invitations</h2>
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
  );
};

export default Invitations;
