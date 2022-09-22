import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Nav from "./Nav2";
import style from "./Profile.module.css";
import d from "./Detail.module.css";
import Button from "@mui/material/Button";


export default function Profile() {

    const history = useHistory();
    const { user, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const userEmail = useSelector(state =>  state.user ) ;
    const profilePic = userEmail?.name || user?.name
    const img =`https://avatars.dicebear.com/api/jdenticon/${profilePic}.svg`;
    // if (userEmail.image!=""){
    //     img = userEmail.image
    // } else if(user?.picture!=""){
    //     img = user.picture
    // } else {
    //     img = `https://avatars.dicebear.com/api/jdenticon/${profilePic}.svg`
    // }

    const handleButton = () => {
        history.push("/")
    }

    return (
        <div >
            <Nav/>
            <div className={style.profile}>
                {
                userEmail ? (  
                    <div>
                        <img src={userEmail?.image || img} 
                            name={userEmail.name} alt="image not found"
                            style={{height: "300px"}}></img>
                        <h1>{userEmail.name}</h1>
                        <h2>{userEmail.email}</h2>
                        <Button variant="outlined" size="small" onClick={handleButton} sx={{ fontSize: "2rem", alignSelf:"center"}}>
                            GO HOME
                        </Button>
                    </div> 
                ) 
                : 
                (
                    <div>
                        <img src={user?.picture || img}
                         name={user.name}
                         style={{height: "300px"}}/>
                        <h1>{user.name}</h1>
                        <h2>{user.email}</h2>
                        <Button variant="outlined" size="small" onClick={history.push("/")} className={d.cartButton}>
                            GO HOME
                        </Button>
                    </div> 
                ) 
                }
            </div>
        </div>

    )
}