import * as React from "react";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { AppBar, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Menu, MenuItem, Divider, Slide } from "@mui/material";
import Box from "@mui/material/Box";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { StyledEngineProvider } from "@mui/material/styles";
import n from "./Nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  filterByGenderInNav,
  getProduct,
  logout as logoutEmail,
} from "../redux/action";
import Cart from "./Cart";
//import Logout from "./Logout";
import { useAuth0 } from "@auth0/auth0-react";
import LoginAuth0 from "./LoginAuth0";
import { useHistory } from "react-router-dom";
import ViewOrder from "./ViewOrder";
import img from "../loginAzul.png"

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorElm, setAnchorElm] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const user1 = useSelector((state) => state.user);
  console.log(Object.keys(user1).length)
  const [log, setLog] = useState(true);
  const { isAuthenticated, logout, user } = useAuth0();
  console.log(user)
  console.log(isAuthenticated)
  const handleClick = (e) => {
    history.push("/products");
    dispatch(filterByGenderInNav(e.target.value));
  };
  const resetFilters = () => {
    dispatch(getProduct());
  };

  /*   function handleSubmit() {
      console.log(user1);
      if (Object.keys(user1).length > 0) {
        addEventListener.location.reload();
        history.push("/home");
      }
    } */

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
      console.log("hola")
      return logout();
    }
  }

  const handleProfile = (e) => {
    e.preventDefault();
    console.log(e.target.innerText)
    history.push("/profile")
  }

  const goHome = () => {
    history.push("/");
  };

  function handleHistory(e) {
    e.preventDefault(e);
    history.push("/order");
  }

  return (
    <>
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar style={{ backgroundColor: "#FDFFFF" }} className={n.appbar}>
          <Toolbar className={n.container}>
            <Box display="flex" className={n["logo-container"]}>
              <Tooltip title={"Go Home"}>
                <img src={logo} alt="" onClick={goHome} className={n.reset} />
              </Tooltip>
              <Tooltip title={"Refresh filters"}>
                <Typography
                  variant="h4"
                  style={{ color: "#000", marginLeft: "1rem" }}
                  onClick={resetFilters}
                  className={n.reset}
                >
                  Athens
                  </Typography>
              </Tooltip>
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
                    <a href="#scrollDiv">
                      <button value="women-jersey" onClick={handleClick}>
                        Jerseys
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="women-shorts" onClick={handleClick}>
                        Shorts
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="women-boots" onClick={handleClick}>
                        Boots
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="women-more" onClick={handleClick}>
                        More
                        </button>
                    </a>
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
                    <a href="#scrollDiv">
                      <button value="men-jerseys" onClick={handleClick}>
                        Jerseys
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="men-shorts" onClick={handleClick}>
                        Shorts
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="men-boots" onClick={handleClick}>
                        Boots
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="men-more" onClick={handleClick}>
                        More
                        </button>
                    </a>
                  </ul>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <Typography
                  color="primary"
                  variant="h6"
                  className={n["options-children"]}
                >
                  Kids
                  </Typography>
                <div className={n["options-dropdown-children"]}>
                  <ul>
                    <a href="#scrollDiv">
                      <button value="kids-jerseys" onClick={handleClick}>
                        Jerseys
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="kids-shorts" onClick={handleClick}>
                        Shorts
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="kids-boots" onClick={handleClick}>
                        Boots
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="kids-more" onClick={handleClick}>
                        More
                        </button>
                    </a>
                  </ul>
                </div>
              </div>
              <div style={{ position: "relative" }}>
                <Typography
                  color="primary"
                  variant="h6"
                  className={n["options-other"]}
                >
                  Sports
                  </Typography>
                <div className={n["options-dropdown-other"]}>
                  <ul>
                    <a href="#scrollDiv">
                      <button value="sports-soccer" onClick={handleClick}>
                        Soccer
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="sports-basketball" onClick={handleClick}>
                        Basketball
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="sports-tennis" onClick={handleClick}>
                        Tennis
                        </button>
                    </a>
                    <a href="#scrollDiv">
                      <button value="sports-others" onClick={handleClick}>
                        Others
                        </button>
                    </a>
                  </ul>
                </div>
              </div>
            </Box>
              <Box display="flex" sx={{ alignItems: "center" }}>
                <Box>
                  <SearchBar />
                </Box>
                <Cart />
                <Box className={n["login-container"]}>
                  {!isAuthenticated && Object.keys(user1).length === 0 ? (
                    <Link to="/login">
                      <Button variant="contained" sx={{ marginBottom: "0.7rem" }}>
                        Sign In
                      </Button>
                    </Link>
                  ) : Object.keys(user1).length !== 0 ? (
                    <>
                    
                      <Tooltip
                        title={
                          `Logged as ${user1.name}`
                        }
                        >
                        {/* <div style={{background: "ligth-blue", borderRadius: "50%", width:"1.8rem", height: "1.8rem" }}> */}
                        <img
                          alt="avatar"
                          height={30}
                          width={30}
                          src={user1.image ? user1.image : img}
                          loading="lazy"
                          style={{ borderRadius: "50%" }}
                          onClick={handleSubmit}
                          />
                          {/* </div> */}
                      </Tooltip>
                      <Menu
                        open={openMenu}
                        anchorEl={anchorElm}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <Divider />
                        <MenuItem onClick={(e) => handleHistory(e)}
                        >My purchases</MenuItem>
                        <Divider />
                        <MenuItem name="balance" onClick={handleClose}>
                          Logout
                        </MenuItem>
                  </Menu>
                  </>
                ) : (
                      <>
                      <Tooltip
                        title={`Logged as ${user.given_name}`}
                      >
                        <img
                          alt="avatar"
                          height={30}
                          width={30}
                          src={user.picture}
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
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <Divider />
                        <MenuItem onClick={(e) => handleHistory(e)}
                        >My purchases</MenuItem>
                        <Divider/>
                        <MenuItem name="balance" onClick={handleClose}>
                          Logout
                        </MenuItem>
                      </Menu>
                      </>
                    )}                
                {/* <Tooltip
                  title={`${
                    Object.keys(user1).length !== 0
                      ? `Logged as ${user1.name}`
                      : "Go Login"
                    }`}> */}
                {/* <Tooltip
                      title={`${
                        Object.keys(user).length !== 0
                          ? `Logged as ${user.name}`
                          : "Go Login"
                      }`}/> */}

                {/*  <AccountCircleIcon
                    onClick={(e) => handleSubmit(e)}
                    sx={{
                      fontSize: "large",
                      color: `${
                        Object.keys(user1).length !== 0
                          ? "#0000FF"
                          : "#888787"
                        }`,
                      marginBottom: "0.5rem",
                      width: "30px",
                      height: "30px",
                      marginRight: "1rem",
                    }}
                  />
                </Tooltip>
                <Menu open={openMenu} anchorEl={anchorElm} onClose={handleClose} >
                  <MenuItem>
                    <Tooltip title="Continue with email">
                      <Link to='/login'>
                        <MailIcon sx={{ color: 'black' }} />
                      </Link>
                    </Tooltip>
                  </MenuItem>
                  <Divider />
                  <MenuItem name="balance" onClick={handleClose} ><LoginAuth0 className={n.google} /></MenuItem>
                </Menu>
                    */}
                {/* {isAuthenticated ? <Logout className={n.google} /> : } */}
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
