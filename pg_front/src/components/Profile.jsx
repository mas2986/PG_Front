import React from "react";
import { useAuth0 } from "@auth0/auth0-react"


export default function Profile() {

    const { user, isAuthenticated } = useAuth0();

    // return (
    //     isAuthenticated && 
    //     <div>
    //         <img src={user.picture} name={user.name}></img>
    //         <h1>{user.name}</h1>
    //         <h2>{user.email}</h2>
    //     </div>
    // )
}