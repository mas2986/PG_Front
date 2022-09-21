import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import GoogleIcon from '@mui/icons-material/Google';
import "../styles/LoginAuth0.css"
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";


export default function LoginAuth0(){
    const { loginWithRedirect } = useAuth0();
    return (
        <div>
            <Tooltip title={"Continue with Google"}>
            <Button size="small" className="myDIV" variant="outlined"><GoogleIcon onClick={()=> loginWithRedirect()}/></Button>
            </Tooltip>
        </div>
    )
}