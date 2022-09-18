import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Swal from 'sweetalert2';
import { createReview } from '../redux/action';
import axios from "axios";

export default function Review(props) {

  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const products = useSelector((state) => state.products)
  const post = useSelector((state) => state.postreviews)
   let id = props.id
  const UserId = user.id

let ramdom = []
  
 const userOrder = order.filter((item) => item.userId === id) && (order.filter(item => item.orderStatus === "completed"))
 

 console.log(order)



for (let i = 0; i < userOrder.length; i++) {
  if(userOrder[i]['idProduct'].split(", ").includes(id)){
    ramdom.push(userOrder[i]['idProduct'])
    console.log(ramdom)
  } 
  
}

 
  
  const [rating, setRating] = useState(0);
  const [comment,setComment]= useState('');
  const dispatch=useDispatch();

    const handleChange=(e)=>{
        e.preventDefault();
        setComment(e.target.value)
    }
    const handleSubmit=()=>{
      console.log(typeof(toString(rating)))
         dispatch(createReview(id, {comment:comment, rating:rating, userId:UserId}))
          setRating(0);
          setComment('')
    }

  return (
    <div className='general-cont'>
      <Box component="fieldset" mb={3} borderColor="transparent">
        
    {ramdom.length && !post.length?  (
      <>
        <Typography component="legend">Califica este producto:</Typography>
        <div className='stars'>
            <h2 className='number'>{rating}</h2>
            <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
                event.preventDefault();
                setRating(newValue);
            }}
            />
        </div> 
         
        <form className='little-form'>
            <textarea value={comment} onChange={(e)=>handleChange(e)} 
            placeholder='Escribe tu reseña sobre este artículo aqui.' />
            <button onClick={(e)=>{e.preventDefault();handleSubmit()}} >Enviar</button>
        </form> 
        </> )
: ramdom.length && post.length?  post : <p></p>} 
      </Box>
    </div>
  );
}
