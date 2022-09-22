import { Box } from "@mui/material";
import React from "react";

const ProfileInfos = ({ tempUser }) => {
  return (
    <Box className="ProfileInfos">
      <p>Username : {tempUser.username}</p>
      <p>Name : {tempUser.name}</p>
      <p>Surname : {tempUser.surname}</p>
      <p>E-mail address : {tempUser.email}</p>
      <p>Phone Number : {tempUser.phoneNumber}</p>
      <p>Gender : {tempUser.gender}</p>
      <p>Birthdate : NOT DEFINED</p>
    </Box>
  );
};

export default ProfileInfos;
