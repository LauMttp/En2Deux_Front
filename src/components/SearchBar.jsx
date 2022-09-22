import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import UserAvatar from "./UserAvatar";

function SearchBar({ relationStatus, checkRelation }) {
  const initialSearchState = "Please select a user";
  const { token } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchState);
  const [searchedUser, setSearchedUser] = useState(null);

  //GET ALL USERS
  useEffect(() => {
    const config = {
      method: "get",
      url: "https://endeuxdeux.herokuapp.com/api/user/all",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setAllUsers([searchQuery, ...response.data.map((el) => el.username)]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //WHEN CLICK ON SEARCH SHOULD RETURN
  //BUTTON THAT CORRESPONDS THE SEARCHED USER
  const handleSearch = () => {
    const config = {
      method: "get",
      url: `https://endeuxdeux.herokuapp.com/api/user/${searchQuery}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("search:", searchQuery);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setSearchedUser(response.data);
        checkRelation(response.data[0].username);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //IF NO INVITE AND NO RELATION
  const handleAdd = (searchedUser) => {
    const config = {
      method: "post",
      url: `https://endeuxdeux.herokuapp.com/api/friend/${searchedUser[0]._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log("allUsers", allUsers);
  console.log("searchedUser", searchedUser);
  console.log("searchQuery", searchQuery);

  return (
    <>
      <Autocomplete
        value={searchQuery}
        onChange={(event, newValue) => setSearchQuery(newValue)}
        disablePortal
        id="combo-box-demo"
        options={allUsers}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Search a username" />
        )}
      />
      <Button variant="outlined" color="success" onClick={handleSearch}>
        Search
      </Button>
      <div>
        {searchedUser ? (
          <>
            <ListItemButton>
              <ListItemAvatar>
                <UserAvatar
                  initial={
                    searchedUser[0].name.charAt(0) +
                    searchedUser[0].surname.charAt(0)
                  }
                />
              </ListItemAvatar>
              <ListItemText
                id={searchedUser[0]._id}
                primary={searchedUser[0].username}
                secondary={relationStatus}
              />
            </ListItemButton>
            {relationStatus === "add" ? (
              <Button
                className="add-button"
                variant="contained"
                onClick={() => handleAdd(searchedUser)}
              >
                Send Invite
              </Button>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
}

export default SearchBar;
