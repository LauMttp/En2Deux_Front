import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserAvatar from "../components/UserAvatar";
import { AuthContext } from "../contexts/AuthContext";
import { Button, CircularProgress } from "@mui/material";
import ProfileInfos from "../components/Profile/ProfileInfos";
import EditableProfileInfos from "../components/Profile/EditableProfileInfos";
import "./Profile.css";

const Profile = () => {
  const { token, user, setUser, logout } = useContext(AuthContext);
  const [isEditable, setisEditable] = useState(false);
  const [tempUser, setTempUser] = useState(null);

  useEffect(() => {
    if (token) {
      const config = {
        method: "get",
        url: "https://endeuxdeux.herokuapp.com/api/user/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
          setTempUser(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [token]);

  const baseUrl = "https://endeuxdeux.herokuapp.com";

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

  if (!user) return <CircularProgress color="secondary" />;

  return (
    <div className="Profile">
      <div className="profilehaeder">
        <h2>PROFILE</h2>
        <Button size="small" color="error" onClick={deleteUser}>
          Delete my account
        </Button>
      </div>
      <div className="infos">
        {isEditable ? (
          <EditableProfileInfos
            setisEditable={setisEditable}
            tempUser={tempUser}
            setTempUser={setTempUser}
          />
        ) : (
          <ProfileInfos tempUser={tempUser} />
        )}
        <div className="buttonsbox">
          <UserAvatar initial={user.name.charAt(0) + user.surname.charAt(0)} />
          <Button
            size="small"
            color="success"
            onClick={(e) => {
              setisEditable((current) => !current);
            }}
          >
            {isEditable ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
