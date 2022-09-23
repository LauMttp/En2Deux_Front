import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Container from "@mui/material/Container";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default Layout;
