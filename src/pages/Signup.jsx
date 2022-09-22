import React, { useState } from "react";
import axios from "axios";
import Form from "../components/Form";

const Signup = () => {
  const initialUserState = {
    name: "",
    surname: "",
    email: "",
    password: "",
    username: "",
  };

  const [user, setUser] = useState(initialUserState);

  const baseUrl = "https://endeuxdeux.herokuapp.com";

  function createUser() {
    const config = {
      method: "post",
      url: `${baseUrl}/api/auth/signup`,
      headers: {},
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
    { id: "email", fieldName: "Adresse e-mail", placeholder: "kash@kash.com" },
    { id: "name", fieldName: "Name" },
    { id: "surname", fieldName: "Surame" },
    { type: "password", id: "password", fieldName: "Password" },
  ];

  return (
    <div className="Signup">
      <h2>SIGN UP</h2>
      <Form
        submitField="Sign Up"
        fields={fields}
        formData={user}
        setFormData={setUser}
        initialFormDataState={initialUserState}
        submitFunc={createUser}
        isSubmit={true}
      />
    </div>
  );
};

export default Signup;
