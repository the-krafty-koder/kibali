import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Documents from "./app/Documents";
import Dashboard from "./app/Dashboard";

const theme = createTheme({
  typography: {
    fontFamily: "Sen",
  },
  palette: {
    background: {
      default: "#f7f5fa",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/documents" element={<Documents />} />
          {/* <Route path="/app/analytics" element={<Analytics />}
          <Route path="/app/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
