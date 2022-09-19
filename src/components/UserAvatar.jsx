import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

const UserAvatar = ({ initial }) => {
  return <Avatar sx={{ bgcolor: deepOrange[500] }}>{initial}</Avatar>;
};

export default UserAvatar;
