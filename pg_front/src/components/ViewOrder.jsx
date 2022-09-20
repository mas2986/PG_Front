import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewOrder } from "../redux/action";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Nav from "./Nav";
import Button from "@mui/material/Button";
import Section from "../components/Section"
import "../styles/ViewOrder.css"


export default function ViewOrder() {
    
 const dispatch = useDispatch();   
 const order = useSelector(state => state.order);
 const user = useSelector(state => state.user)
 const product = useSelector(state => state.products)
 console.log(order)
 console.log(user)
 
 useEffect(() => {
    dispatch(viewOrder(user.id))
  }, [dispatch]);


    return (
        <> 
        <Nav/>
        <Section className="section-home"/>
        <Typography
            variant="h3"
            color="primary"
            align="center"
            sx={{ marginTop: "2rem" }}
          >
            Your purchases
          </Typography>
          <Box sx={{
            display:"flex",
            flexDirection:"column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}>
        { order?.length ? (
                order.map((e,i) => (
                  <Box key={i} sx={{ marginBottom: "2rem" }}>
                    <Card
                    sx={{
                      height: "auto",
                      display: "flex",
                      flexDirection: "row-reverse",
                      marginTop: "2rem",
                      marginLeft: "2rem",
                      width: "80vw",
                      zIndex: "-1",
                      backgroundColor: "ffff"
                    }}
                    // className={f.cardMedia}
                  >
                    
                    <CardContent sx={{ width: "87rem" }}>
                      <Typography gutterBottom variant="h6" component="div">
                      You paid ${e.totalPrice},00
                      </Typography>
                      <Typography>{e.titleProduct}</Typography>
                      <Typography variant="h8">Quantity of products: {e.quantity}</Typography>
                      <Typography
                        flexGrow={1}
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginTop: "0.2rem" }}
                      >
                       Order {e.orderStatus[0].toUpperCase()+e.orderStatus.substring(1,7)}
                      </Typography>
                      <Typography
                        flexGrow={1}
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginTop: "0.2rem" }}
                      >
                      Received on {e.createdAt.substring(0,10)}
                      </Typography>
                      <Button className="info-btn" href="/products" variant="contained" color="success" size="large">Keep Shopping</Button>
                    </CardContent>


                    
                    </Card>
                </Box>
                ))
              ) : 
                <Typography
                  flexGrow={1}
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "1rem", display: "flex" }}
            >
            YOU HAVE NOT MADE ANY PURCHASES YET.
            </Typography>
              
          }
          </Box>
        </>
    )
}