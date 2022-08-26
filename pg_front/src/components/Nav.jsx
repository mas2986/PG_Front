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
                <Typography variant="h6" color="primary" className={n.options}>
                  Women
                </Typography>
                <div className={n["options-dropdown"]}>
                  <ul>
                    <li>Shirts</li>
                    <li>Jeans</li>
                    <li>Skirts</li>
                    <li>Sneakers</li>
                  </ul>
                </div>
                <Typography color="primary" variant="h6" className={n.options}>
                  Men
                </Typography>
                <Typography color="primary" variant="h6" className={n.options}>
                  Children
                </Typography>
                <Typography color="primary" variant="h6" className={n.options}>
                  Other
                </Typography>
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
