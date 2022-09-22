import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Swal from 'sweetalert2';
import { createReview, getReviews } from '../redux/action';
import axios from "axios";


export default function Review(props) {

  const order = useSelector((state) => state.order)
  const user = useSelector((state) => state.user)
  const post = useSelector((state) => state.reviews)
   let id = props.id
  let UserId = user.id
  let userCommentbyProd = [] 
  let userOrder = []
  const [rating, setRating] = useState(0);
  const [comment,setComment]= useState('');
  const dispatch = useDispatch();

  
  
  let ramdom = []
  if(UserId ){
  let userComment = post.filter((item) => item.userId === UserId) // review del usuario 
   userCommentbyProd = userComment.filter((item) => item.productId === Number(id)) // review del usuario que realizo en el producto
  console.log(userCommentbyProd)
  userOrder = order.filter((item) => item.userId === UserId) && (order.filter(item => item.orderStatus === "completed"))  // ordenes completadas del usuario 
  console.log(userOrder)
  for (let i = 0; i < userOrder.length; i++) {
    if(userOrder[i]['idProduct'].split(", ").includes(id)){
      ramdom.push(userOrder[i]['idProduct'])
     console.log(ramdom)
    } 
    
  }  
}
console.log(userCommentbyProd)
useEffect(() => {
  
    dispatch(getReviews())
  
}, [post.length])

    const handleChange=(e)=>{
        e.preventDefault();
        setComment(e.target.value)
    }
    const handleSubmit=(e)=>{
      e.preventDefault();
      dispatch(createReview(id, {comment:comment, rating:rating, userId:UserId}))
      setRating(0);
      setComment('')  
    }

  return (
    <div className='general-cont'>
      <Box component="fieldset" mb={3} borderColor="transparent" >         
      { userCommentbyProd.length === 0 && ramdom.length !== 0 ?  
      <div sx={{
        borderColor:"#40F99B",
        borderRadius:"10px",
        margin:"200px"
      }}>  
        <Typography align="center" component="h1" sx={{
          marginTop:"1rem",
          fontSize:"1rem"
        }}>Comment and rate this product:</Typography>
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
         
        <form className='little-form' style={{
          display:"flex",
          flexDirection:"column"
        }}>
            <textarea value={comment} onChange={(e)=>handleChange(e)} 
            placeholder='Write your review about this product here.' style={{
              fontSize:"1rem",
              height:"100px",
              marginTop:"20px"
            }}/>
            <button 
              onClick={(e)=>handleSubmit(e)} 
              style={{
                backgroundColor: "#DE6B48",
                color:"white",
                marginTop:"30px",
                height:"50px",
                fontSize:"1.5rem",
                width:"400px",
                alignSelf:"center",
                borderRadius:"8px",
                border:"0"
              }}            
            >
              Send
            </button>
        </form> 
        </div> 
: <div/>}  
      </Box>
    </div>
  );
}
