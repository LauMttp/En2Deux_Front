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
        <h1>En Deux Deux</h1>
      </Link>

      {isLoggedIn ? (
        <div className="menu-right">
          <Link to="/profile">
            <Button variant="outlined">Profile</Button>
          </Link>
          <Link to="/events">
            <Button variant="outlined">Events</Button>
          </Link>
          <Link to="/friends">
            <Button variant="outlined">friends</Button>
          </Link>
          <Button variant="contained" color="error" onClick={logout}>
            Log Out
          </Button>
        </div>
      ) : (
        <div className="menu-right">
          <Link to="/login">
            <Button variant="contained">Login</Button>
          </Link>

          <Link to="/signup">
            <Button variant="outlined">Sign Up</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
