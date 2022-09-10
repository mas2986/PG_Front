import React, { useEffect, useState } from "react";
import { Box, Pagination as Pag } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const pageSize = 21;

export default function Pagination({products,pagination,setPagination}) {


/* useEffect(()=>{            
  console.log(products.length)
  setPagination({...pagination, count: products.length})    
},[products.length]) */


const handlePageChange = (event, page) => {
    event.preventDefault();
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({
      ...pagination, 
      from: from,
      to: to
    })   
}

  return (
    <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
      <Pag   
        //page={pagination.from===0?1:page}     
        count={Math.ceil(pagination.count / pageSize)}
        onChange={handlePageChange}
      />
    </Box>
  );
}
