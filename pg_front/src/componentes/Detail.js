import React from 'react';
import {useParams} from 'react-router-dom';

export default function Detail(){
    const {id} = useParams()

    return(
        <>
            <h3>Soy el detalle número {id}</h3>
        </>
    )
}