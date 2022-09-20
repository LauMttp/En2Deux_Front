import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const OneEvent = () => {
  const { token } = useContext(AuthContext);
  const [event, setEvent] = useState("");
  const baseUrl = "http://localhost:5005";

  return <div>OneEvent</div>;
};

export default OneEvent;
