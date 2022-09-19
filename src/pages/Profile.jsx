import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import { Box } from "@mui/system";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState();

  useEffect(() => {
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
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const baseUrl = "http://localhost:5005";

  function updateUser() {
    const data = JSON.stringify({ user });
    const config = {
      method: "patch",
      url: `${baseUrl}/api/user/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: user,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const fields = [
    { id: "username", fieldName: "Username" },
    { id: "name", fieldName: "Name" },
    { id: "surname", fieldName: "Surame" },
    { id: "email", fieldName: "E-mail address", placeholder: "kash@kash.com" },
    { id: "phoneNumber", fieldName: "Phone Number" },
    { id: "gender", fieldName: "Gender" },
    { type: "password", id: "password", fieldName: "Password" },
  ];

  if (!user) return <p>Loading...</p>;

  return (
    <div className="Profile">
      <h2>PROFILE</h2>
      <Box>
        <UserAvatar initial={user.name.charAt(0) + user.surname.charAt(0)} />

        <Form
          submitField="Save"
          fields={fields}
          formData={user}
          setFormData={setUser}
          initialFormDataState={user}
          submitFunc={updateUser}
        />
      </Box>
    </div>
  );
};

export default Profile;
