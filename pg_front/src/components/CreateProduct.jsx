import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import h from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import { addToCart, removeDupsCart, mercadoPago } from "../redux/action";
import plop from "../asset/plop.mp3";
import { Link, useHistory } from "react-router-dom";

export default function CardProduct(props) {
  const [translate, setTranslate] = React.useState("");
  const items = useSelector((state) => state.cartItems);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const history = useHistory();
  let official = 149;

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
    new Audio(plop).play();
    dispatch(addToCart(props.id));
    dispatch(removeDupsCart(props.id));
  }

  async function handlePay(e) {
    e.preventDefault();
    dispatch(mercadoPago({ price: props.price * official }));
    history.push("/entrega");
  }

  return (
    <Card
      className={h.cards}
      sx={{
        margin: 0.5,
        width: 300,
        height: 450,
        background: "#FFFFFF",
        // boxShadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);
        boxShadow: 2,
      }}
      onMouseOver={() => setTranslate("translateY(-0.5rem)")}
      onMouseLeave={() => setTranslate("")}
    >
      <CardMedia
        component="img"
        height="250"
        image={props.Image}
        alt={props.title}
        sx={{ position: "relative" }}
        className={props.stock > 0 ? "" : h.outOfStock}
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
        {props.stock > 0 ? (
          <Button
            onClick={(e) => handlePay(e)}
            href={"/entrega"}
            size="small"
            // className={props.stock < 1 ? h.buyBtnStock : ""}
          >
            BUY
          </Button>
        ) : (
          <h3
            style={{ color: "red", whiteSpace: "nowrap", marginLeft: "1rem" }}
          >
            OUT OF STOCK
          </h3>
        )}
        <Button
          size="small"
          onClick={addCart}
          className={props.stock < 1 ? h.stockNoShow : h.stockShow}
        >
          ADD TO CART
        </Button>
        <Link to={`/detail/${props.id}`}>
          <Button size="small">DETAIL</Button>
        </Link>
        {/* target="_blank" */}
      </CardActions>
    </Card>
  );
}
