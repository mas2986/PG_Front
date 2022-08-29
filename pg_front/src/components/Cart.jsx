import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import n from "./Nav.module.css";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function Cart(props) {
  const { cartItems, onAdd } = props;

  return (
    <div>
      <StyledBadge badgeContent={1} color="error">
        <ShoppingCartOutlinedIcon
          className={n["shopping-cart"]}
          sx={{ fontSize: "29px", color: "#888787" }}
        />
      </StyledBadge>
      {/* {cartItems.length > 0 &&
        cartItems.map((i) => {
          <Box>
            <ul>
              <li>{i}</li>
            </ul>
          </Box>;
        })} */}
    </div>
  );
}

export default Cart;
