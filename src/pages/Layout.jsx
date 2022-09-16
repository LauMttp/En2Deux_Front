import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Container from "@mui/material/Container";

const Layout = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
