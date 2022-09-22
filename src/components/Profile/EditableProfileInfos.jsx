import { Box } from "@mui/material";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Form from "../Form";

const EditableProfileInfos = ({ tempUser, setTempUser, setisEditable }) => {
  const { token, setUser } = useContext(AuthContext);
  const baseUrl = "https://endeuxdeux.herokuapp.com";

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
        console.log(response.data);
        setUser(response.data);
        setisEditable((current) => !current);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <Box sx={{ "& button": { m: 1 } }}>
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
    </div>
  );
};

export default EditableProfileInfos;
