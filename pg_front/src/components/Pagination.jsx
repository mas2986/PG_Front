import React, { useEffect, useState } from 'react';
import { getPaginatedProduct } from '../redux/action';
import { Box, Pagination as Pag} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { products as pr } from '../asset/products';

const pageSize = 6;

export default function Pagination(){

    const dispatch = useDispatch();
    const products = useSelector(state=>state.products)

    const [pagination, setPagination] = useState({
        count: 0,
        from: 0,
        to: pageSize
    })

    useEffect(()=>{
        
        dispatch(getPaginatedProduct({from: pagination.from, to: pagination.to}))
        console.log(products.length)
        setPagination({...pagination, count: pr.length})
        
    },[pagination.from, pagination.to])

    
    const handlePageChange = (event, page) => {

        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;

        setPagination({...pagination, from: from, to: to})

    }
    

    return (
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
        >
        <Pag
            count={Math.ceil(pagination.count/pageSize)}
            onChange={handlePageChange}
        />
        </Box>
    )

}