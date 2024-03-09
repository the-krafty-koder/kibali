import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Grid, ThemeProvider, createTheme } from "@mui/material";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  useNavigate,
} from "react-router-dom";
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
  const { credentials } = useStore((state) => ({
    credentials: state.credentials,
  }));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={!credentials.token ? <Login /> : <Dashboard />}
          />
          <Route
            path="/app/dashboard"
            element={!credentials.token ? <Login /> : <Dashboard />}
          />
          <Route
            path="/app/terms-of-service"
            element={!credentials.token ? <Login /> : <TermsOfServiceList />}
          />
          <Route
            path="/app/terms-of-service/:tosId"
            element={!credentials.token ? <Login /> : <TermsOfService />}
          />
          <Route
            path="/app/terms-of-service/:tosId/versions/:versionId"
            element={!credentials.token ? <Login /> : <TermsOfServiceVersion />}
          />
          <Route
            path="/app/share"
            element={!credentials.token ? <Login /> : <Share />}
          />
          <Route
            path="/app/profile"
            element={!credentials.token ? <Login /> : <Profile />}
          />

          <Route
            path="/view/:orgName/:termsOfServiceName"
            element={<DisplayTos />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
