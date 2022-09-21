import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { Box } from "@mui/system";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../contexts/AuthContext";
import { Button, CircularProgress } from "@mui/material";

const Profile = () => {
  const { token, user, setUser, logout } = useContext(AuthContext);
  const [tempUser, setTempUser] = useState(null);

  useEffect(() => {
    if (token) {
      const config = {
        method: "get",
        url: "http://localhost:5005/api/user/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setTempUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [token]);

  const baseUrl = "http://localhost:5005";

  function updateUser() {
    const config = {
      method: "patch",
      url: `${baseUrl}/api/user/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: tempUser,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  //DEL USER ACCOUNT
  function deleteUser() {
    const config = {
      method: "delete",
      url: `${baseUrl}/api/user/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    logout();
  }

  const fields = [
    { id: "username", fieldName: "Username" },
    { id: "name", fieldName: "Name" },
    { id: "surname", fieldName: "Surame" },
    { id: "email", fieldName: "E-mail address", placeholder: "kash@kash.com" },
    { id: "phoneNumber", fieldName: "Phone Number" },
    {
      id: "gender",
      fieldName: "Gender",
      type: "select",
      values: ["male", "female"],
    },
  ];

  if (!user) return <CircularProgress color="secondary" />;

  return (
    <div className="Profile">
      <h2>PROFILE</h2>
      <Box sx={{ "& button": { m: 1 } }}>
        <UserAvatar initial={user.name.charAt(0) + user.surname.charAt(0)} />

        <Form
          submitField="Save"
          fields={fields}
          formData={tempUser}
          setFormData={setTempUser}
          initialFormDataState={tempUser}
          submitFunc={updateUser}
          isSubmit={true}
        />
      </Box>
      <Button variant="contained" color="error" onClick={deleteUser}>
        Delete my account
      </Button>
    </div>
  );
};

export default Profile;
