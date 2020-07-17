import React from "react";
import "./App.css";
import NavBar from "./component/Navbar";
import Menu from "./component/Menu";
import Container from "@material-ui/core/Container";
import AppRouter from "./component/AppRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="left-menu">
        <Menu />
      </div>
      <Container>
        <AppRouter />
      </Container>
    </BrowserRouter>
  );
}

export default App;
