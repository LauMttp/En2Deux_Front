import { Box } from "@mui/material";
import React from "react";

const ProfileInfos = ({ tempUser }) => {
  if (!tempUser) return <div>Loading</div>;
  return (
    <Box className="ProfileInfos">
      <p>
        <b>Username :</b> {tempUser.username}
      </p>
      <p>
        <b>Name :</b> {tempUser.name}
      </p>
      <p>
        <b>Surname :</b> {tempUser.surname}
      </p>
      <p>
        <b>E-mail address :</b> {tempUser.email}
      </p>
      <p>
        <b>Phone Number :</b> {tempUser.phoneNumber}
      </p>
      <p>
        <b>Gender :</b> {tempUser.gender}
      </p>
      <p>
        <b>Birthdate :</b> NOT DEFINED
      </p>
    </Box>
  );
};

export default ProfileInfos;
