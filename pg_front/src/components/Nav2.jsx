import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { StyledEngineProvider } from "@mui/material/styles";
import n from "./Nav2.module.css";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cart from "./Cart";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Nav(props) {
  const user = useSelector((state) => state.user);

  const goHome = () => {
    <Link to={"/home"} />;
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar style={{ backgroundColor: "#FDFFFF" }} className={n.appbar}>
            <Toolbar className={n.container}>
              <Box display="flex" className={n["logo-container"]}>
                <Link
                  to="/home"
                  className={n["logo-link"]}
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    marginRight: "51rem",
                  }}
                >
                  <img src={logo} alt="" className={n.reset} />
                  <Typography
                    variant="h4"
                    style={{ color: "#000", marginLeft: "1rem" }}
                    className={n.reset}
                  >
                    Athens
                  </Typography>
                </Link>
              </Box>
              <Box display="flex" sx={{ alignItems: "center" }}>
                <Box
                  className={n["login-container"]}
                  display="flex"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Cart />
                  <Link to="/login">
                    <Tooltip
                      title={`${
                        Object.keys(user).length !== 0
                          ? `Logged as ${user.name}`
                          : "Go Login"
                      }`}
                    >
                      <AccountCircleIcon
                        sx={{
                          fontSize: "large",
                          color: `${
                            Object.keys(user).length !== 0
                              ? "#0000FF"
                              : "#888787"
                          }`,
                          marginTop: "0.5rem",
                          width: "30px",
                          height: "30px",
                        }}
                      />
                    </Tooltip>
                  </Link>
                </Box>
              </Box>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
      </StyledEngineProvider>
    </>
  );
}
