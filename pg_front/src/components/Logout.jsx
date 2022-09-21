import React from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';



export default function Logout() {

  const { logout } = useAuth0();


    return (
        <div>
            <Button size="small" variant="outlined"><GoogleIcon onClick={()=> logout()}/></Button>
        </div>
    )
}