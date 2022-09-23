import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Button from "@mui/material/Button";
import "./Header.css";

const Header = () => {
  const { logout, isLoggedIn } = useContext(AuthContext);
  return (
    <header className="App-header">
      <Link to="/">
        <h1 className="Logo">En2Deux</h1>
      </Link>

      {isLoggedIn ? (
        <div className="menu-right">
          <Link to="/profile">
            <Button color="success" variant="outlined">
              Profile
            </Button>
          </Link>
          <Link to="/events">
            <Button color="success" variant="outlined">
              Events
            </Button>
          </Link>
          <Link to="/invitations">
            <Button color="success" variant="outlined">
              Invitations
            </Button>
          </Link>
          <Link to="/friends">
            <Button color="success" variant="outlined">
              friends
            </Button>
          </Link>
          <Button variant="contained" color="error" onClick={logout}>
            Log Out
          </Button>
        </div>
      ) : (
        <div className="menu-right">
          <Link to="/login">
            <Button color="success" variant="contained">
              Login
            </Button>
          </Link>

          <Link to="/signup">
            <Button color="success" variant="outlined">
              Sign Up
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
