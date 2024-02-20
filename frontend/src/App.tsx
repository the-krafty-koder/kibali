import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import TermsOfServiceList from "./app/TermsOfServiceLIst";
import Dashboard from "./app/Dashboard/Dashboard";
import TermsOfService from "./app/TermsOfService";
import TermsOfServiceVersion from "./app/TermsOfServiceVersion";
import Share from "./app/Share";
import DisplayTos from "./app/DisplayTos";
import Profile from "./app/Profile";
import useStore from "./store/store";

const theme = createTheme({
  typography: {
    fontFamily: "Sen",
    h4: {
      color: "rgb(31, 31, 31, .9)",
    },
    h2: {
      fontFamily: "Outfit",
    },
    h5: {
      fontFamily: "Outfit",
    },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: `#350182`,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#350182",
            },
          },
        },
      },
    },
  },
});

function App() {
  const store = useStore();
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
          <Route path="/app/share" element={<Share />} />
          <Route path="/app/profile" element={<Profile />} />

          <Route path="/orgName/:termsOfServiceName" element={<DisplayTos />} />

          {/* <Route path="/app/analytics" element={<Analytics />}
          <Route path="/app/profile" element={<Profile />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
