import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import TermsOfServiceList from "./app/TermsOfServiceLIst";
import Dashboard from "./app/Dashboard";
import TermsOfService from "./app/TermsOfService";
import TermsOfServiceVersion from "./app/TermsOfServiceVersion";

const theme = createTheme({
  typography: {
    fontFamily: "Sen",
  },
  palette: {
    background: {
      default: "#fcfcfc",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
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
          <Route
            path="/app/terms-of-service"
            element={<TermsOfServiceList />}
          />
          <Route
            path="/app/terms-of-service/:tosId"
            element={<TermsOfService />}
          />
          <Route
            path="/app/terms-of-service/:tosId/versions/:versionId"
            element={<TermsOfServiceVersion />}
          />

          {/* <Route path="/app/analytics" element={<Analytics />}
          <Route path="/app/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
