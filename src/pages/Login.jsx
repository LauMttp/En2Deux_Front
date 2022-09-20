import React, { useContext, useState } from "react";
import Form from "../components/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialLoginState = {
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialLoginState);

  const logIn = (event) => {
    const config = {
      method: "post",
      baseURL: "http://localhost:5005",
      url: "/api/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios(config)
      .then((response) => {
        // include response.data inside a token obj
        const jwt = response.data;
        setToken(jwt);
        navigate("/");
      })
      .catch((error) => {
        console.log("CAUGHT ERROR WHEN LOGGING IN");
        console.log(error);
      });
  };

  const fields = [
    { id: "username", fieldName: "Username" },
    { type: "password", id: "password", fieldName: "Password" },
  ];
  return (
    <div className="Login">
      <h2>LOGIN</h2>
      <Form
        submitField="Log In"
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        initialFormDataState={initialLoginState}
        submitFunc={logIn}
        isSubmit={true}
      />
    </div>
  );
};

export default Login;
