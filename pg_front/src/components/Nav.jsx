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
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { StyledEngineProvider } from "@mui/material/styles";
import n from "./Nav.module.css";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { filterByGenderInNav } from "../redux/action";

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
  const dispatch = useDispatch();

  const handleClick = (e) => {
    console.log(e.target.value);
    dispatch(filterByGenderInNav(e.target.value));
  };

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
              <Box display="flex">
                <SearchBar />
                <Box className={n["login-container"]}>
                  <img
                    src={carrito}
                    style={{ width: "27px", height: "27px" }}
                  />
                  <Link to="/login">
                    <AccountCircleIcon
                      sx={{
                        fontSize: "large",
                        color: "#888787",
                        margin: "0.5rem 0 0 1.2rem",
                        width: "29px",
                        height: "29px",
                      }}
                    />
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
