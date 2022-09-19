import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import {AppBar , Button, Menu, MenuItem, Divider} from "@mui/material";
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
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { logout as logoutEmail } from "../redux/action";

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
  // const user = useSelector((state) => state.user);
  const [anchorElm, setAnchorElm] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const user1 = useSelector((state) => state.user);
  const [log, setLog] = React.useState(true);
  const { isAuthenticated, logout, user } = useAuth0();
  const history = useHistory();
  const dispatch = useDispatch()
   
  function handleSubmit(e) {
    e.preventDefault();
    setAnchorElm(e.currentTarget);
    setOpenMenu(true);
  }

  const handleClose = (e) => {
    setOpenMenu(false);
    const value = e.target.innerText;
    setAnchorElm(null);
    if (value === "Logout" && Object.keys(user1).length !== 0) {
      return dispatch(logoutEmail(history));
    }
    if (value === "Logout" && Object.keys(user).length !== 0) {
      return logout();
    }
  }

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar style={{ backgroundColor: "#FDFFFF" }} className={n.appbar}>
            <Toolbar className={n.container}>
              <Box display="flex" className={n["logo-container"]}>
                <Link
                  to="/"
                  className={n["logo-link"]}
                  style={{
                    display: "flex",
                    textDecoration: "none",
                    marginRight: "51rem",
                  }}
                >
                  <Tooltip title={"Home"}>
                    <img src={logo} alt="" className={n.reset} />
                  </Tooltip>
                  <Tooltip title={"Home"}>
                    <Typography
                      variant="h4"
                      style={{ color: "#000", marginLeft: "1rem" }}
                      className={n.reset}
                    >
                      Athens
                    </Typography>
                  </Tooltip>
                </Link>
              </Box>
              <Box display="flex" sx={{ alignItems: "center" }}>
                <Cart />
                <Box className={n["login-container"]} display="flex">
                {!isAuthenticated && Object.keys(user1).length === 0 ? (
                  <Link to="/login">
                    <Button variant="contained" sx={{ marginBottom: "1px" }}>
                      Sign In
                      </Button>
                    </Link>
                  ) : user1.image || isAuthenticated ? (
                    <>
                      <Tooltip
                        title={
                          user1
                          ?
                          `Logged as ${user1.name}`
                          :
                          `Logged as ${user.name}`
                        }
                      >
                        <img
                          alt="avatar"
                          height={30}
                          width={30}
                          src={user1.image || user.picture}
                          loading="lazy"
                          style={{ borderRadius: "50%" }}
                          onClick={handleSubmit}
                        />
                      </Tooltip>
                      <Menu
                        open={openMenu}
                        anchorEl={anchorElm}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <Divider />
                        <MenuItem name="balance" onClick={handleClose}>
                          Logout
                        </MenuItem>
                  </Menu>
                  </>
                ) : (
                      <>
                      <Tooltip
                        title={
                          `Logged as ${user1.name}` || `Logged as ${user.name}`
                        }
                      >
                        <AccountCircleIcon
                          onClick={handleSubmit}
                          sx={{
                            color: 'gray',
                            fontSize: "large",
                            marginBottom: "0.5rem",
                            width: "30px",
                            height: "30px",
                            marginRight: "1rem",
                          }}
                        />
                      </Tooltip>
                      <Menu
                        open={openMenu}
                        anchorEl={anchorElm}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <Divider />
                        <MenuItem name="balance" onClick={handleClose}>
                          Logout
                        </MenuItem>
                      </Menu>
                      </>
                    )}      
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