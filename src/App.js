import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewEvent from "./pages/NewEvent";
import ErrorPage from "./pages/ErrorPage";
import Events from "./pages/Events";
import Invitations from "./pages/Invitations";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import { create } from "@mui/material/styles/createTransitions";
import Layout from "./pages/Layout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />

          {/* Event creation phase */}
          <Route path="newevent" element={<NewEvent />} />

          <Route path="events" element={<Events />} />
          <Route path="invitations" element={<Invitations />} />

          {/* Insert friendship invitations inside friends route */}
          <Route path="friends" element={<Friends />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
