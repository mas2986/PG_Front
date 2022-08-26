import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import logo from "../logo.png";
import carrito from "../carrito.png";
import login from "../login.png";
import { Button } from "@mui/material";
import SearchBar from "./SearchBar";
import { StyledEngineProvider } from "@mui/material/styles";
import n from "./Nav.module.css";

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
  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar style={{ backgroundColor: "#FDFFFF" }} className={n.appbar}>
            <Toolbar className={n.container}>
              <Box display="flex" className={n["logo-container"]}>
                <img src={logo} alt="" />
                <Typography
                  variant="h4"
                  style={{ color: "#000", marginLeft: "1rem" }}
                >
                  Athens
                </Typography>
              </Box>
              <Box className={n["options-container"]}>
                <div style={{ position: "relative" }}>
                  <Typography
                    variant="h6"
                    color="primary"
                    className={n["options-women"]}
                  >
                    Women
                  </Typography>
                  <div className={n["options-dropdown-women"]}>
                    <ul>
                      <li>Shirts</li>
                      <li>Jeans</li>
                      <li>Skirts</li>
                      <li>Sneakers</li>
                    </ul>
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <Typography
                    color="primary"
                    variant="h6"
                    className={n["options-men"]}
                  >
                    Men
                  </Typography>
                  <div className={n["options-dropdown-men"]}>
                    <ul>
                      <li>Shirts</li>
                      <li>Jeans</li>
                      <li>Skirts</li>
                      <li>Sneakers</li>
                    </ul>
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <Typography
                    color="primary"
                    variant="h6"
                    className={n["options-children"]}
                  >
                    Children
                  </Typography>
                  <div className={n["options-dropdown-children"]}>
                    <ul>
                      <li>Shirts</li>
                      <li>Jeans</li>
                      <li>Skirts</li>
                      <li>Sneakers</li>
                    </ul>
                  </div>
                </div>
                <div style={{ position: "relative" }}>
                  <Typography
                    color="primary"
                    variant="h6"
                    className={n["options-other"]}
                  >
                    Other
                  </Typography>
                  <div className={n["options-dropdown-other"]}>
                    <ul>
                      <li>Shirts</li>
                      <li>Jeans</li>
                      <li>Skirts</li>
                      <li>Sneakers</li>
                    </ul>
                  </div>
                </div>
              </Box>
              <Box display="flex">
                <SearchBar />
                <Box className={n["login-container"]}>
                  <img
                    src={carrito}
                    style={{ width: "25px", height: "25px" }}
                  />
                  <img
                    src={login}
                    style={{
                      width: "25px",
                      height: "25px",
                      marginLeft: "1rem",
                    }}
                  />
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
