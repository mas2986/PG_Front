import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import logo from "../logo.png";
import carrito from "../carrito.png";
import login from "../login.png";
import { Button, makeStyles } from "@mui/material";
import SearchBar from "./SearchBar";

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

//se me rompe la pag al tratar de usar custom classes
// const useStyles = makeStyles({
//   logoContainer: {
//     display: "flex",
//   },
// });

export default function Nav(props) {
  // const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ backgroundColor: "#FDFFFF" }}>
          <Toolbar>
            <Box display="flex" flexGrow={1}>
              <img src={logo} alt="" />
              <Typography variant="h4" style={{ color: "#000" }}>
                Athens
              </Typography>
            </Box>
            <Box flexGrow={1}>
              <Button>Women</Button>
              <Button>Men</Button>
              <Button>Children</Button>
              <Button>Other</Button>
            </Box>
            <Box display="flex">
              <SearchBar />
              <img
                src={carrito}
                style={{ width: "24.18px", height: "22.5px" }}
              />
              <img src={login} style={{ width: "24.18px", height: "22.5px" }} />
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
