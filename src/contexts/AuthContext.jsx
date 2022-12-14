import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
// Step one: create a context object to import elsewhere
// Create the wrapper component
const AuthContextWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkLogin = (token) => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const authenticateUser = () => {
    axios
      .get("https://endeuxdeux.herokuapp.com/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // on initial render, check for existing token
  useEffect(() => {
    const existingToken = localStorage.getItem("AUTH_TOKEN");
    setToken(existingToken);
    checkLogin(existingToken);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      authenticateUser();
    }
  }, [token]);

  const updateToken = (token) => {
    localStorage.setItem("AUTH_TOKEN", token);
    setToken(token);
    checkLogin(token);
  };

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    setToken("");
    setIsLoggedIn(false);
    navigate("/");
  };
  console.log(user);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        user,
        setUser,
        token,
        setToken: updateToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
