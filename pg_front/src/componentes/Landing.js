import React from 'react';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <>
            <Link to='/login'>
                <Button variant="contained" href="#contained-buttons">
                    LOGIN
                </Button>
            </Link>
        </>
    )
}