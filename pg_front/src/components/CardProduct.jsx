import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardProduct(props) {
  return (
    <Card sx={{ 
      margin:0.5,
      width: 320,
      height: 300,
      background: '#FFFFFF',
      boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)'      
    }}>
      <CardMedia
        component="img"
        height="140"
        image={props.Image}
        alt={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.sport}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">BUY</Button>
        <Button size="small">ADD TO CART</Button>
      </CardActions>
    </Card>
  );
}
