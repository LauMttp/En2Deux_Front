import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewEvent from "./pages/NewEvent";
import ErrorPage from "./pages/ErrorPage";
import Events from "./pages/Events";
import Invitations from "./pages/Invitations";
import Friends from "./pages/Friends";
import Profile from "./pages/Profile";
import NewEventDate from "./pages/NewEventDate";
import NewEventLocation from "./pages/NewEventLocation";
import NewEventDeadlines from "./pages/NewEventDeadlines";
import { create } from "@mui/material/styles/createTransitions";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />

          {/* Event creation phase */}
          <Route path="/newevent" element={<NewEvent />} />
          <Route path="/newevent/date" element={<NewEventDate />} />
          <Route path="/newevent/location" element={<NewEventLocation />} />
          <Route path="/newevent/deadlines" element={<NewEventDeadlines />} />

          <Route path="/events" element={<Events />} />
          <Route path="/invitations" element={<Invitations />} />

          {/* Insert friendship invitations inside friends route */}
          <Route path="/friends" element={<Friends />} />

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Navbar />
    </div>
  );
}

export default App;
