import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { logout, isLoggedIn } = useContext(AuthContext);
  return (
    <header className="App-header">
      <h1>En Deux Deux</h1>
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/profile">My Account</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login to your account</Link>
          <Link to="/signup">signup</Link>
        </>
      )}
    </header>
  );
};

export default Header;
