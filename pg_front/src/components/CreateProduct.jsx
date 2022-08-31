import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import h from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/action";

export default function CardProduct(props) {
  const [translate, setTranslate] = React.useState("");
  const items = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const styles = {
    position: "relative",
    top: "-1.5rem",
    left: "0.5rem",
    background: "#fff",
    display: "inline-block",
    width: "3.2rem",
    transition: "all 0.5s",
    transform: translate,
  };

  function addCart() {
    dispatch(addToCart(props.id));
  }

  return (
    <Card
      className={h.cards}
      sx={{
        margin: 0.5,
        width: 320,
        height: 300,
        background: "#FFFFFF",
        // boxShadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);
        boxShadow: 2,
      }}
      onMouseOver={() => setTranslate("translateY(-0.5rem)")}
      onMouseLeave={() => setTranslate("")}
    >
      <CardMedia
        component="img"
        height="140"
        image={props.Image}
        alt={props.title}
        sx={{ position: "relative" }}
      />
      <Typography className={h.price} sx={styles}>
        ${props.price}.00
      </Typography>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Box display="flex">
          <Typography flexGrow={1} variant="body2" color="text.secondary">
            {props.sport}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button href={"/entrega"} size="small">
          BUY
        </Button>
        <Button size="small" onClick={addCart}>
          ADD TO CART
        </Button>
        <Button href={`/detail/${props.id}`} size="small">
          DETAIL
        </Button>
        {/* target="_blank" */}
      </CardActions>
    </Card>
  );
}
